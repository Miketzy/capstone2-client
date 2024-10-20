import React from "react";
import "./DatabaseHome.css";
import Database from "../../Components/Database/Database-image/Database";
import Navbar from "../../Components/Navbar/Navbar";
import ImageSlider from "../../Components/Database/Image-slider/ImageSlider";

function DatabaseHome() {
  return (
    <div className="databasehome">
      <div className="navbar-Top">
        <Navbar />
      </div>
      <div className="slider">
        <ImageSlider />
      </div>
      <div className="hometitle">
        <h1>Welcome to Species Gallery</h1>
      </div>
      <div className="database">
        <Database />
      </div>
    </div>
  );
}

export default DatabaseHome;
