import { USER_API } from "../config";
import { useAuthContext } from "./useAuthContext";

export function useSignUp() {
  const { dispatch } = useAuthContext();

  async function signUp(username: string, email: string, password: string) {
    const body = { username, email, password };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${USER_API}/sign-up`, options);

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
    }

    return { response, json };
  }

  return { signUp };
}
