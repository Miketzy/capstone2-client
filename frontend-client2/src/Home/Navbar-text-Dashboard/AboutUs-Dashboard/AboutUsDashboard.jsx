import React, { useState } from "react";
import "./AboutUs.css";
import AboutUs from "../../../Components/navbar-button/About-Us-Page/AboutUs";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/sidebar/Sidebar";

function AboutUsDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="about-uscontainer">
      <div className="about-usnavbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="abo">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>

      <div className="about-us">
        <AboutUs />
      </div>
    </div>
  );
}

export default AboutUsDashboard;
