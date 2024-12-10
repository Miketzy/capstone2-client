import React, { useState } from "react";
import axios from "axios";

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
    <div className="flex items-center justify-center min-h-screen  p-4 pt-16 lg:pt-[20vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full z-10 border border-gray-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Current Password:
            </label>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password."
              required
              className="w-full p-3 border h-[40px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password:
            </label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="w-full h-[40px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm New Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full h-[40px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full h-[40px] mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
