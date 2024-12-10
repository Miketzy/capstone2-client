import React, { useState } from "react";
import "./ChangePasswordDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import ChangePassword from "../../../Components/Database/Profile/Change-Password-page/ChangePassword";
import Sidebar from "../../../Components/sidebar/Sidebar";

function ChangePasswordDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="changePassword-container">
      <div className="changePassword-navbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="changepassword-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
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
