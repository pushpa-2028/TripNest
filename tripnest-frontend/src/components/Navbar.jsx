import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const location = useLocation();

    return (

        <header className="navbar">

            <div className="nav-container">

                <Link to="/" className="logo">

                    <span className="logo-icon">✈️</span>

                    <div className="logo-text">

                        <h2>TripNest</h2>

                        <small>Explore Beyond Limits</small>

                    </div>

                </Link>

                <nav>

                    <ul className="nav-links">

                        <li>
                            <Link
                                className={location.pathname === "/" ? "active" : ""}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={location.pathname === "/dashboard" ? "active" : ""}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={location.pathname === "/my-trips" ? "active" : ""}
                                to="/my-trips"
                            >
                                My Trips
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={location.pathname === "/create-trip" ? "active" : ""}
                                to="/create-trip"
                            >
                                Create Trip
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={location.pathname === "/destinations" ? "active" : ""}
                                to="/destinations"
                            >
                                Destinations
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={location.pathname === "/add-destination" ? "active" : ""}
                                to="/add-destination"
                            >
                                Add Destination
                            </Link>
                        </li>

                    </ul>

                </nav>

                <div className="nav-buttons">

                    <Link className="login-btn-nav" to="/login">
                        Login
                    </Link>

                    <Link className="register-btn-nav" to="/register">
                        Register
                    </Link>

                </div>

            </div>

        </header>

    );

}

export default Navbar;