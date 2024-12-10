import React, { useState } from "react";
import "./FeaturesDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Features from "../../../Components/navbar-button/Features-Page/Features";
import Sidebar from "../../../Components/sidebar/Sidebar";

function FeaturesDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="features-container">
      <div className="features-navbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="feature-sdie">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="features-us">
        <Features />
      </div>
    </div>
  );
}

export default FeaturesDashboard;
