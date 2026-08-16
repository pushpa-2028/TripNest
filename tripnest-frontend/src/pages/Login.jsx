import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      // =====================================
      // SAVE LOGIN INFORMATION
      // =====================================

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data.userId
      );

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      console.log(
        "Login error:",
        error
      );

      alert(
        "Invalid Email or Password"
      );
    }
  };

  const handleGoogleLogin = () => {

    alert(
      "Google Login will be integrated in the next version."
    );
  };

  return (

    <div className="login-page">

      <div className="overlay"></div>

      <div className="login-card">

        <div className="login-header">

          <h1>
            ✈ TripNest
          </h1>

          <h2>
            Welcome Back 👋
          </h2>

          <p>
            Login to continue your travel journey.
          </p>

        </div>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          type="button"
        >

          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />

          Continue with Google

        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="📧 Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <div className="password-box">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="🔒 Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="show-btn"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>

          </div>

          <div className="forgot-password">

            <a href="#">
              Forgot Password?
            </a>

          </div>

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <div className="register-link">

          Don't have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;