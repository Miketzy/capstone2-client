import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../Config"; // Dalawang level up ✅

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (target) => {
    setFormData({ ...formData, [target.name]: target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        firstname: formData.firstname,
        middlename: formData.middlename,
        lastname: formData.lastname,
        email: formData.email,
        gender: formData.gender,
        password: formData.password,
        address: formData.address,
      });

      console.log(response.data);
      alert("Registration successful!");
      navigate("/login");

      setFormData({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
        address: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
    
      // Check for network-related errors
      if (!error.response) {
        alert("Registration failed due to weak or no internet connection. Please check your connection and try again.");
      } else {
        // Other errors (e.g., server errors)
        alert("Registration failed. Please try again.");
      }
    }
    

  const GoToLogin = async () => {
    try {
      await axios.post(`${API_URL}/gotologin`);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const loginContainerStyle = {
    backgroundImage: `url('/picture/wmremove-transformed.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="clientRegistration" style={loginContainerStyle}>
      <div className="registration-wrapper w-full max-w-3xl mx-auto p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Register to BioExplorer
        </h2>
        <p className="text-center text-green-600 mb-4">
          Join us in exploring and protecting biodiversity!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-semibold text-green-800"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="middlename"
                className="block text-sm font-semibold text-green-800"
              >
                Middle Name
              </label>
              <input
                type="text"
                name="middlename"
                placeholder="Middle Name"
                value={formData.middlename}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-sm font-semibold text-green-800"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-green-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-green-800"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-green-800"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-green-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-green-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center mt-4 text-green-700">
            Already have an account?{" "}
            <span
              className="text-green-800 font-bold cursor-pointer hover:underline"
              onClick={GoToLogin}
            >
              Login
            </span>
          </p>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Registration;
