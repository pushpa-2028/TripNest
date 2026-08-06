import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

function Register() {

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

      await axios.post(
        "http://https://tripnest-fird.onrender.com/api/auth/register",
        user
      );

      alert("Registration Successful!");

      setUser({
        fullName: "",
        email: "",
        password: ""
      });

    } catch (error) {

      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert("Registration Failed: " + JSON.stringify(error.response.data));
      } else {
        console.log(error.message);
        alert(error.message);
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