import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./EnterNewPassword.css";

function EnterNewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    // Validate input
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Send password reset request to backend
    axios
      .post("http://localhost:8081/reset-password", {
        email,
        password: newPassword,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Password reset successfully!");
          navigate("/"); // Redirect to home or login page
        } else {
          alert(response.data.message); // Alert message from the server
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        alert("An error occurred while resetting the password.");
      });
  };

  return (
    <div className="forgot-body">
      <div className="forgot-password-container">
        <h2>Create new Password</h2>
        <div className="forgot-password">
          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="forgot-password">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button
          className="forgot-password-button"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default EnterNewPassword;
