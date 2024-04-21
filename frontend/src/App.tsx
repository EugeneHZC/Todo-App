import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import CreateTodoPage from "./pages/CreateTodoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />

      <div>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-todo"
            element={user ? <CreateTodoPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/sign-up"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
