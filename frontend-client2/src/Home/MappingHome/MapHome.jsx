import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import MapSpecies from "../../Components/Mapping/Map/MapSpecies";
import "./MapHome.css";
import Sidebar from "../../Components/sidebar/Sidebar";

function MapHome() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="maphome">
      <div className="nmahome-navbar">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="maphome-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="hometitle">
        <h1>Species Mapping</h1>
      </div>
      <div className="mapping">
        <MapSpecies />
      </div>
    </div>
  );
}

export default MapHome;
