import React from "react";
import "./AboutUs.css";
import AboutUs from "../../../Components/navbar-button/About-Us-Page/AboutUs";
import Navbar from "../../../Components/Navbar/Navbar";

function AboutUsDashboard() {
  return (
    <div className="about-uscontainer">
      <div className="about-usnavbar">
        <Navbar />
      </div>

      <div className="about-us">
        <AboutUs />
      </div>
    </div>
  );
}

export default AboutUsDashboard;
