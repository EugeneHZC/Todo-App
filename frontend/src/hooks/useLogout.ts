import { useAuthContext } from "./useAuthContext";
import { useTodoContext } from "./useTodoContext";

export const useLogout = () => {
  const { user, dispatch: authDispatch } = useAuthContext();
  const { dispatch: todoDispatch } = useTodoContext();

  const logout = () => {
    localStorage.removeItem("user");

    authDispatch({ type: "LOGOUT", payload: user });

    todoDispatch({ type: "SET_TODOS", payload: [] });
  };

  return logout;
};
