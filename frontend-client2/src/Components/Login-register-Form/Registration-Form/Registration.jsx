import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "", // Change from lastName to lastname
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
        lastname: formData.lastname, // Use lastname for consistency
        email: formData.email,
        gender: formData.gender,
        password: formData.password,
        address: formData.address,
      });

      console.log(response.data);
      alert("Registration successful!");
      // Reset form or redirect here as needed

      // Navigate to login after successful registration
      navigate("/"); // Adjust the path as needed

      setFormData({
        firstname: "",
        middlename: "",
        lastname: "", // Reset to empty
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

  return (
    <div className="clientRegistratio">
      <div className="registration-wrapper">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="registation-name">
            <div className="registration-Firstname">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                name="firstname" // Use 'firstname' to match state
                placeholder="First Name"
                value={formData.firstname}
                onChange={(e) => handleChange(e.target)} // Pass target directly
                required
              />
            </div>
            <div className="registration-Middlename">
              <label htmlFor="middlename">Middle Name</label>
              <input
                type="text"
                name="middlename" // Use 'middlename' to match state
                placeholder="Middle Name"
                value={formData.middlename}
                onChange={(e) => handleChange(e.target)} // Pass target directly
              />
            </div>
          </div>

          <div className="registration-lastname">
            <div className="lname">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname" // Use 'lastname' to match state
                placeholder="Last Name"
                value={formData.lastname}
                onChange={(e) => handleChange(e.target)} // Pass target directly
                required
              />
            </div>
            <div className="registration-email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleChange(e.target)} // Pass target directly
                required
              />
            </div>
          </div>
          <div className="fifth">
            <div className="genderfith">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender" // Add name attribute
                value={formData.gender || ""}
                onChange={(e) => handleChange(e.target)} // Pass target directly
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="addressfith">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange(e.target)} // Pass target directly
                required
              />
            </div>
          </div>
          <div className="registration-password">
            <div className="pass">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e.target)} // Pass target directly
                required
              />
            </div>

            <div className="cpass">
              <label htmlFor="Cpass">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e.target)} // Pass target directly
                required
              />
            </div>
          </div>
          <button type="submit">Register</button>
          <p className="regtolog">
            Already have an Account?{" "}
            <span className="reglog" onClick={GoToLogin}>
              Login
            </span>
          </p>
        </form>
        {error && <p className="error">{error}</p>}{" "}
        {/* Display error message if exists */}
      </div>
    </div>
  );
};

export default Registration;
