import React, { useState } from "react";
import "./MyprofileDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Profile from "../../../Components/Database/Profile/Profile-Page/Profile";
import Sidebar from "../../../Components/sidebar/Sidebar";

function MyprofileDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="myprofile-container">
      <div className="myprofile-navbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="myprofile-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="myprofile">
        <Profile />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default MyprofileDashboard;
