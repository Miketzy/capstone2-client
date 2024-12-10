import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:8081/api/register", {
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
      navigate("/"); // Navigate to login after successful registration

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
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const GoToLogin = async () => {
    try {
      await axios.post("http://localhost:8081/gotologin");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const loginContainerStyle = {
    backgroundImage: `url('/picture/durso.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="clientRegistratio" style={loginContainerStyle}>
      <div className="registration-wrapper w-full max-w-4xl mx-auto p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form space-y-6">
          <div className="registation-name flex space-x-4">
            <div className="registration-Firstname w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-semibold"
              >
                Firstname
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="registration-Middlename w-1/2">
              <label
                htmlFor="middlename"
                className="block text-sm font-semibold"
              >
                Middle Name
              </label>
              <input
                type="text"
                name="middlename"
                placeholder="Middle Name"
                value={formData.middlename}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="registration-lastname flex space-x-4">
            <div className="lname w-1/2">
              <label htmlFor="lastname" className="block text-sm font-semibold">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="registration-email w-1/2">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="gender-address flex space-x-4">
            <div className="genderfith w-1/2">
              <label htmlFor="gender" className="block text-sm font-semibold">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="addressfith w-1/2">
              <label htmlFor="address" className="block text-sm font-semibold">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="registration-password flex space-x-4">
            <div className="pass w-1/2">
              <label htmlFor="pass" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="cpass w-1/2">
              <label htmlFor="Cpass" className="block text-sm font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e.target)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[100vh] max-w-xs py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
          >
            Register
          </button>

          <p className="regtolog text-center mt-4">
            Already have an Account?{" "}
            <span
              className="reglog text-blue-500 cursor-pointer"
              onClick={GoToLogin}
            >
              Login
            </span>
          </p>
        </form>
        {error && (
          <p className="error text-red-500 text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Registration;
