import React from "react";
import "./ChangePasswordDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import ChangePassword from "../../../Components/Database/Profile/Change-Password-page/ChangePassword";

function ChangePasswordDashboard() {
  return (
    <div className="changePassword-container">
      <div className="changePassword-navbar">
        <Navbar />
      </div>

      <div className="changePasswords">
        <ChangePassword />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ChangePasswordDashboard;
