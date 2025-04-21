import "./GraphClient.css";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Graph from "../../Components/Analytics-page/Graph-page/Graph";

function GrapClient() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="grap-cards">
      <div className="graph-navbarTop">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="graph-sidbar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>

      <div className="graphtitlehome">
        <h1 className="graphtitlewelocome">Species Analytics</h1>
      </div>
      <br />

      <div className="Grap-home">
        <Graph />
      </div>

      <br />
    </div>
  );
}

export default GrapClient;
