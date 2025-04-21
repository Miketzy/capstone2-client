import "./GraphClient2.css";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Graph2 from "../../Components/Analytics-page/Graph-page2/Graph2";

function GrapClient2() {
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
        <h1 className="graphtitlewelocome">Species Status</h1>
      </div>
      <br />

      <div className="Grap-home">
        <Graph2 />
      </div>
      <br />
    </div>
  );
}

export default GrapClient2;
