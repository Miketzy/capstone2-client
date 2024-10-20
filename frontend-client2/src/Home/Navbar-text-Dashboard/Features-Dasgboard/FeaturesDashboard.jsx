import React from "react";
import "./FeaturesDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Features from "../../../Components/navbar-button/Features-Page/Features";

function FeaturesDashboard() {
  return (
    <div className="features-container">
      <div className="features-navbar">
        <Navbar />
      </div>
      <div className="features-us">
        <Features />
      </div>
    </div>
  );
}

export default FeaturesDashboard;
