import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", user);

      alert("Registration Successful!");

      setUser({
        fullName: "",
        email: "",
        password: ""
      });

      navigate("/login");

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert("Registration Failed");
      } else {
        alert("Network Error");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={registerUser}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={user.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;