import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="border-bottom border-secondary border-3 navbar p-3 d-flex justify-content-space-between align-items-center">
      <Link to="/" className="text-muted fs-2 text-decoration-none fw-bold">
        Todo App
      </Link>

      {user && (
        <div className="d-flex gap-3 m-2">
          <Link to="/" className="fs-5 text-secondary text-decoration-none">
            Home
          </Link>
        </div>
      )}

      {!user && (
        <div className="d-flex gap-3 m-2">
          <Link
            to="/sign-up"
            className="fs-5 text-secondary text-decoration-none"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="fs-5 text-secondary text-decoration-none"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
