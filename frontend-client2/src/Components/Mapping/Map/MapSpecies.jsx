import React, { useState } from "react";
import axios from "axios";
import { HiLocationMarker } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

function MapSpecies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState("");
  const [mapPosition, setMapPosition] = useState([7.1529, 126.4517]); // Davao Oriental center

  const handleSearch = async () => {
    try {
      setError("");
      const response = await axios.get(
        `http://localhost:8081/api/species?name=${searchTerm}`
      );
      if (response.data) {
        setSpeciesData(response.data);
        setMapPosition([response.data.latitude, response.data.longitude]);
      } else {
        setError("Species not found.");
        setSpeciesData(null);
      }
    } catch (err) {
      setError("An error occurred while fetching species data.");
      setSpeciesData(null);
    }
  };

  return (
    <div className="map-container">
      <div
        className="search-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search species"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px 0 0 5px",
            border: "1px solid #ddd",
            width: "100%",
            maxWidth: "500px",
            fontSize: "17px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px",
            borderRadius: "0 5px 5px 0",
            border: "1px solid #ddd",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            height: "7vh",
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {speciesData && (
        <div className="display-conainer">
          <div className="seachshowname">
            <img
              src={`http://localhost:8081/uploads/images/${speciesData.uploadimage}`}
              alt={speciesData.specificname}
              style={{ width: "200px", height: "200px" }}
            />
            <div className="displayname">
              <h3>Species: {speciesData.specificname}</h3>
              <p>Common Name: {speciesData.commonname}</p>
              <p>Scientific Name: {speciesData.scientificname}</p>
              <p>Classification: {speciesData.speciescategory}</p>
              <p>Location: {speciesData.location}</p>
            </div>
          </div>
        </div>
      )}
      <br />
      <MapContainer
        center={mapPosition}
        zoom={10}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          className="mapping"
          url="https://api.maptiler.com/maps/jp-mierune-dark/256/{z}/{x}/{y}.png?key=txroCKKY059zWv1MqNe0"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors'
        />
        {speciesData && (
          <Marker position={mapPosition}>
            <Popup>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HiLocationMarker
                  style={{ fontSize: "24px", marginRight: "8px" }}
                />
                <strong>{speciesData.specificname}</strong>
                <br />
                <em>{speciesData.location}</em>
                <br />
                <img
                  src={`http://localhost:8081/uploads/images/${speciesData.uploadimage}`}
                  alt={speciesData.specificname}
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapSpecies;
