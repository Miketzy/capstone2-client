import React, { useState } from "react";
import "./EditProfileDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import EditProfile from "../../../Components/Database/Profile/Edit-{rofile-Page/EditProfile";
import Sidebar from "../../../Components/sidebar/Sidebar";

function EditProfileDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="editprofile-container">
      <div className="editprofile-navbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="editprofile-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="myprofile">
        <EditProfile />
      </div>
    </div>
  );
}

export default EditProfileDashboard;
