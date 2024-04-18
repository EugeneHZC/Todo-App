import React, {
  createContext,
  useReducer,
  useEffect,
  Dispatch,
  ReactNode,
} from "react";

// Define types for state and actions
interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

interface State {
  user: User | null;
}

type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Define the initial state
const initialState: State = {
  user: null,
};

// Create the context
export const AuthContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define the reducer function
const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Create the context provider component
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on component mount
  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("user") || "null");
  //     if (user) {
  //       dispatch({ type: "LOGIN", payload: user });
  //     }
  //   }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
