import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

            const response = await API.post("/auth/login", {

                email,
                password

            });

            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            navigate("/dashboard");

        }

        catch (error) {

            alert("Invalid Email or Password");

            console.log(error);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Welcome Back 👋</h1>

                <p>Login to continue your journey.</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-box">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="show-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;