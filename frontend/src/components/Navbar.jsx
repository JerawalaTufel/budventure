import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Admin Panel
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;  