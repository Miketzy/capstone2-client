import "./home.css";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Card from "../../Components/card/Card";
import Sidebar from "../../Components/sidebar/Sidebar";

function Home() {
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
        <Card />
      </div>
    </div>
  );
}

export default Home;
