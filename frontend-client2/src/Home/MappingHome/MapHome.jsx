import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import MapSpecies from "../../Components/Mapping/Map/MapSpecies";
import "./MapHome.css";

function MapHome() {
  return (
    <div className="maphome">
      <div className="nmahome-navbar">
        <Navbar />
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
