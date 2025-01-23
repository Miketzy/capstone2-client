import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/picture/durso.jpg')" }}
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center">
        {/* Login Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/3">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Login
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>

            <p
              className="text-blue-500 text-sm text-center cursor-pointer mb-4"
              onClick={GoToForgotPassword}
            >
              Forgot Password
            </p>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={GoToRegister}
            >
              Register
            </span>
          </p>
        </div>

        {/* Explanation Section */}
        <div className="lg:ml-10 mt-8 lg:mt-0 text-white text-center lg:text-left">
          <h3 className="text-3xl font-bold">Welcome to Our Application!</h3>
          <p className="mt-4 text-lg leading-relaxed">
            This platform is designed to provide users with a seamless way to
            manage and track species information within the Davao Oriental
            region. Whether you're a contributor, admin, or simply exploring,
            this application helps bridge the gap between science and
            technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
