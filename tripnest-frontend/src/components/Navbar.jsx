import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [unreadCount, setUnreadCount] = useState(0);

  const isActive = (path) => {
    return location.pathname === path;
  };

  /* =========================================
     CHECK LOGIN + FETCH NOTIFICATION COUNT
  ========================================= */

  useEffect(() => {
    setMenuOpen(false);

    const loggedIn = !!localStorage.getItem("token");

    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetchUnreadCount();
    } else {
      setUnreadCount(0);
    }
  }, [location.pathname]);

  /* =========================================
     FETCH UNREAD NOTIFICATION COUNT
  ========================================= */

  const fetchUnreadCount = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/user/${userId}/unread-count`,
        {
          timeout: 10000,
        }
      );

      setUnreadCount(response.data);
    } catch (error) {
      console.error(
        "Error fetching notification count:",
        error
      );

      setUnreadCount(0);
    }
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    setUnreadCount(0);
    setMenuOpen(false);

    alert("Logged out successfully!");

    navigate("/login");
  };

  /* =========================================
     OPEN NOTIFICATIONS
  ========================================= */

  const handleNotificationsClick = async () => {
  const userId = localStorage.getItem("userId");

  setMenuOpen(false);

  if (userId) {
    try {
      await axios.put(
        `${API_BASE_URL}/notifications/user/${userId}/read-all`
      );

      // Remove the red unread badge immediately
      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Error marking notifications as read:",
        error
      );
    }
  }

  navigate("/notifications");
};

  return (
    <header className="navbar">

      <div className="nav-container">

        {/* =====================================
            LOGO
        ===================================== */}

        <Link to="/" className="logo">

          <span className="logo-icon">
            ✈️
          </span>

          <div className="logo-text">

            <h2>
              TripNest
            </h2>

            <small>
              Explore Beyond Limits
            </small>

          </div>

        </Link>


        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <nav className="desktop-nav">

          <ul className="nav-links">

            <li>
              <Link
                className={
                  isActive("/")
                    ? "active"
                    : ""
                }
                to="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className={
                  isActive("/dashboard")
                    ? "active"
                    : ""
                }
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                className={
                  isActive("/my-trips")
                    ? "active"
                    : ""
                }
                to="/my-trips"
              >
                My Trips
              </Link>
            </li>

            <li>
              <Link
                className={
                  isActive("/create-trip")
                    ? "active"
                    : ""
                }
                to="/create-trip"
              >
                Create Trip
              </Link>
            </li>

            <li>
              <Link
                className={
                  isActive("/destinations")
                    ? "active"
                    : ""
                }
                to="/destinations"
              >
                Destinations
              </Link>
            </li>

            <li>
              <Link
                className={
                  isActive("/add-destination")
                    ? "active"
                    : ""
                }
                to="/add-destination"
              >
                Add Destination
              </Link>
            </li>

          </ul>

        </nav>


        {/* =====================================
            DESKTOP AUTH + NOTIFICATION
        ===================================== */}

        <div className="nav-buttons desktop-buttons">

          {isLoggedIn ? (

            <>

              {/* Notification Bell */}

              <button
                className={`notification-bell ${
                  isActive("/notifications")
                    ? "notification-bell-active"
                    : ""
                }`}
                onClick={handleNotificationsClick}
                aria-label="Notifications"
                title="Notifications"
              >

                <span className="bell-icon">
                  🔔
                </span>

                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount > 99
                      ? "99+"
                      : unreadCount}
                  </span>
                )}

              </button>


              {/* Profile */}

              <Link
                className="login-btn-nav"
                to="/profile"
              >
                👤 Profile
              </Link>


              {/* Logout */}

              <button
                className="register-btn-nav"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link
                className="login-btn-nav"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="register-btn-nav"
                to="/register"
              >
                Register
              </Link>

            </>

          )}

        </div>


        {/* =====================================
            MOBILE HAMBURGER
        ===================================== */}

        <button
          className={`mobile-menu-btn ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

      </div>


      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <div
        className={`mobile-menu ${
          menuOpen
            ? "mobile-menu-open"
            : ""
        }`}
      >

        <nav>

          <ul className="mobile-nav-links">

            <li>
              <Link
                className={
                  isActive("/")
                    ? "mobile-active"
                    : ""
                }
                to="/"
              >
                <span>🏠</span>
                Home
              </Link>
            </li>


            <li>
              <Link
                className={
                  isActive("/dashboard")
                    ? "mobile-active"
                    : ""
                }
                to="/dashboard"
              >
                <span>📊</span>
                Dashboard
              </Link>
            </li>


            <li>
              <Link
                className={
                  isActive("/my-trips")
                    ? "mobile-active"
                    : ""
                }
                to="/my-trips"
              >
                <span>🧳</span>
                My Trips
              </Link>
            </li>


            <li>
              <Link
                className={
                  isActive("/create-trip")
                    ? "mobile-active"
                    : ""
                }
                to="/create-trip"
              >
                <span>➕</span>
                Create Trip
              </Link>
            </li>


            <li>
              <Link
                className={
                  isActive("/destinations")
                    ? "mobile-active"
                    : ""
                }
                to="/destinations"
              >
                <span>🌍</span>
                Destinations
              </Link>
            </li>


            <li>
              <Link
                className={
                  isActive("/add-destination")
                    ? "mobile-active"
                    : ""
                }
                to="/add-destination"
              >
                <span>📍</span>
                Add Destination
              </Link>
            </li>


            {/* Mobile Notifications */}

            {isLoggedIn && (
              <li>

                <button
                  className={`mobile-notification-link ${
                    isActive("/notifications")
                      ? "mobile-active"
                      : ""
                  }`}
                  onClick={
                    handleNotificationsClick
                  }
                >

                  <span>
                    🔔
                  </span>

                  Notifications

                  {unreadCount > 0 && (
                    <span className="mobile-notification-badge">
                      {unreadCount > 99
                        ? "99+"
                        : unreadCount}
                    </span>
                  )}

                </button>

              </li>
            )}


            {/* Mobile Profile */}

            {isLoggedIn && (
              <li>

                <Link
                  className={
                    isActive("/profile")
                      ? "mobile-active"
                      : ""
                  }
                  to="/profile"
                >

                  <span>
                    👤
                  </span>

                  Profile

                </Link>

              </li>
            )}

          </ul>

        </nav>


        {/* =====================================
            MOBILE AUTHENTICATION
        ===================================== */}

        <div className="mobile-auth-buttons">

          {isLoggedIn ? (

            <button
              className="mobile-register-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          ) : (

            <>

              <Link
                className="mobile-login-btn"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="mobile-register-btn"
                to="/register"
              >
                Register
              </Link>

            </>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;