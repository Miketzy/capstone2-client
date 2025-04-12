import React, { useState } from "react";
import "./DatabaseHome.css";
import Navbar from "../../Components/Navbar/Navbar";
import ImageSlider from "../../Components/Database/Image-slider/ImageSlider";
import Sidebar from "../../Components/sidebar/Sidebar";
import Database from "../../Components/Database/Database-image/Database";

function DatabaseHome() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="databasehome">
      <div className="navbar-Top">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="databasehome-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="slider">
        <ImageSlider />
      </div>
      <div className="hometitle">
        <h1>Species Gallery</h1>
      </div>
      <div className="database">
        <Database />
      </div>
    </div>
  );
}

export default DatabaseHome;
