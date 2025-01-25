import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa"; // Importing an icon related to nature

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
        "https://capstone2-client.onrender.com/login",
        values,
        {
          withCredentials: true,
        }
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
      await axios.post("https://capstone2-client.onrender.com/gotoregister");
      localStorage.removeItem("token");
      navigate("/registration");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const GoToForgotPassword = async () => {
    try {
      await axios.post("https://capstone2-client.onrender.com/gotoforgot");
      localStorage.removeItem("token");
      navigate("/Enter-Email");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-green-50"
      style={{
        backgroundImage:
          "url('/picture/472546830_1138798994617879_5773074804155834205_n-removebg-preview.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        {/* Nature Icon */}
        <div className="text-center mb-6">
          <FaLeaf className="text-green-600 text-5xl mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-green-700">BioExplorer</h1>
          <p className="text-sm text-green-600 mt-2">
            Explore and protect biodiversity in Davao Oriental.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-green-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-green-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
          </div>

          <p
            className="text-sm text-green-600 cursor-pointer mb-4 text-right hover:underline"
            onClick={GoToForgotPassword}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-green-700">
          Don't have an account?{" "}
          <span
            className="text-green-600 font-semibold cursor-pointer hover:underline"
            onClick={GoToRegister}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
