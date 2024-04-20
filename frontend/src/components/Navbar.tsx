import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-bottom border-secondary border-3 navbar p-4 d-flex justify-content-end gap-3">
      <Link to="/sign-up" className="fs-6 text-secondary text-decoration-none">
        Sign Up
      </Link>
      <Link to="/login" className="fs-6 text-secondary text-decoration-none">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
