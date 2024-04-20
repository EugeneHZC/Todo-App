import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import TodoContextProvider from "./context/TodoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
