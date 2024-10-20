import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for error message

  const navigate = useNavigate();

  // Ensure credentials are sent with requests
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/login",
        values,
        { withCredentials: true } // Ensure credentials are included in the request
      );

      if (response.data) {
        alert("Login successful!");

        // Store the token in local storage
        localStorage.setItem("token", response.data.token);

        // Redirect to home dashboard
        console.log("User successfully logged in.");
        navigate("/Home");
      } else {
        console.log("No data in response:", response);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.Message || "An error occurred during login.";
      setError(errorMessage); // Set the error message in state
    }
  };

  const GoToRegister = async () => {
    try {
      await axios.post("http://localhost:8081/gotoregister");

      localStorage.removeItem("token");

      navigate("/registration");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>} {/* Show error message */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <p className="logf">Forgot Password</p>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="dontAccount">
          Don't have an account?{" "}
          <span className="donReg" onClick={GoToRegister}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
