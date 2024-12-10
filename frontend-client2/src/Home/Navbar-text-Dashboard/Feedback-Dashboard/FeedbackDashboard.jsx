import React, { useState } from "react";
import "./FeedbackDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Feedback from "../../../Components/navbar-button/Feedback-page/Feedback";
import Sidebar from "../../../Components/sidebar/Sidebar";

function FeedbackDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="feedback-container">
      <div className="feedback-navbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="feedback-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="feedback-us">
        <Feedback />
      </div>
    </div>
  );
}

export default FeedbackDashboard;
