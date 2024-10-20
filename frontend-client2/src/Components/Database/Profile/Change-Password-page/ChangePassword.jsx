import React, { useState } from "react";
import axios from "axios";
import "./ChangePasswordsPage.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Check if the new passwords match
    if (newPassword !== confirmPassword) {
      window.alert("New passwords do not match");
      setError("New passwords do not match");
      return;
    }

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      window.alert("No authentication token found. Please log in.");
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      // Send a POST request to the backend API to change the password
      const response = await axios.post(
        "http://localhost:8081/password-changes",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass JWT token for authorization
          },
          withCredentials: true, // Ensure cookies or credentials are passed
        }
      );

      // Display an alert to notify the user of successful password change
      window.alert("Password has been changed successfully");

      // Clear the form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(""); // Clear any previous errors
    } catch (err) {
      // Handle errors from the server or API request
      const errorMessage = err.response?.data?.error || "An error occurred";
      window.alert(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="changepassword-container">
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
