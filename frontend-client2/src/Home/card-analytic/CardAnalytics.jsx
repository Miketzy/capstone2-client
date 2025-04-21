import "./CardAnalytics.css";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import AnalyticsCard from "../../Components/analytics-card/AnalyticsCard";

function CardAnalytics() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="home">
      <div className="navbarTop">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="sidbar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>

      <div className="cards">
        <AnalyticsCard />
      </div>
    </div>
  );
}

export default CardAnalytics;
