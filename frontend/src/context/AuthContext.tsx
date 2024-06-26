import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../config";

interface AuthState {
  user: User | null;
}

interface Action {
  type: string;
  payload: User | null;
}

interface AuthContextState extends AuthState {
  dispatch: Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextState | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case "LOGIN":
        setUser(action.payload);
        break;
      case "LOGOUT":
        setUser(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);

      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
