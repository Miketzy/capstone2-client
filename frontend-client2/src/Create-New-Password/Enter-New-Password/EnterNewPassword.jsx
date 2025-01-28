import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function EnterNewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    setErrorMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    axios
      .post("https://capstone2-client.onrender.com/reset-password", {
        email,
        password: newPassword,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Password reset successfully!");
          navigate("/login");
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setErrorMessage("An error occurred while resetting the password.");
      });
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/picture/wmremove-transformed.jpeg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          Create New Password
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <div className="mb-4 relative">
          <label
            htmlFor="new-password"
            className="block text-sm font-semibold text-gray-700"
          >
            New Password
          </label>
          <div className="relative flex items-center">
            <input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 pr-10"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <Visibility className="text-gray-500" />
              ) : (
                <VisibilityOff className="text-gray-500" />
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-semibold text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 pr-10"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <Visibility className="text-gray-500" />
              ) : (
                <VisibilityOff className="text-gray-500" />
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleResetPassword}
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default EnterNewPassword;
