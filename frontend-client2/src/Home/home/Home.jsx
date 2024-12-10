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

      <div className="hometitlehome">
        <h1 className="hometitlewelocome text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800">
          WELCOME TO BIOEXPLORER
        </h1>
      </div>

      <div className="cards">
        <Card />
      </div>
    </div>
  );
}

export default Home;
