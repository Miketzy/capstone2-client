import React, { useState } from "react";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import API_URL from "../../../../Config";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleVisibility = (setter) => setter((prev) => !prev);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      window.alert("New passwords do not match");
      setError("New passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.alert("No authentication token found. Please log in.");
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/password-changes`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      window.alert("Password has been changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred";
      window.alert(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 pt-16 lg:pt-[20vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full z-10 border border-gray-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Current Password:
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password."
                required
                className="w-full p-3 border h-[40px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                onClick={() => toggleVisibility(setShowCurrentPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password:
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                className="w-full p-3 border h-[40px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                onClick={() => toggleVisibility(setShowNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm New Password:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full p-3 border h-[40px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                onClick={() => toggleVisibility(setShowConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
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
