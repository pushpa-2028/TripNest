import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        TripNest
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/create-trip">Create Trip</Link>
        </li>

        <li>
          <Link to="/my-trips">My Trips</Link>
        </li>

        <li>
          <Link to="/destinations">Destinations</Link>
        </li>

        <li>
          <Link to="/add-destination">Add Destination</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;