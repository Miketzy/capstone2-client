import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiLocationMarker } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Map.css";

function MapSpecies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState("");
  const [mapPosition, setMapPosition] = useState([7.1529, 126.4517]); // Default map position (Davao Oriental)
  const location = useLocation(); // Access the current location

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const commonName = params.get("commonname"); // Extract the 'commonname' query param
    if (commonName) {
      setSearchTerm(commonName);
      handleSearch(commonName); // Trigger search automatically
    }
  }, [location]);

  const handleSearch = async (term) => {
    try {
      setError("");
      const response = await axios.get(
        `http://localhost:8081/api/species?name=${term || searchTerm}`
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
          onClick={() => handleSearch()}
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

      <MapContainer
        center={mapPosition}
        zoom={10}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          className="mapping"
          url="https://api.maptiler.com/maps/jp-mierune-dark/256/{z}/{x}/{y}.png?key=txroCKKY059zWv1MqNe0"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />
        {speciesData && (
          <Marker position={mapPosition}>
            <Popup>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="modalmappingImage">
                  <img
                    src={`http://localhost:8081/uploads/images/${speciesData.uploadimage}`}
                    alt={speciesData.specificname}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div
                  className="textmapping"
                  style={{
                    marginTop: "-10px",
                    marginLeft: "10px",
                    fontSize: "15px",
                    lineHeight: "2",
                  }}
                >
                  <strong
                    className="strong-speciesdata"
                    style={{ fontSize: "15px" }}
                  >
                    {speciesData.commonname}
                  </strong>

                  <br />
                  <HiLocationMarker
                    style={{
                      fontSize: "15px",
                      marginRight: "9px",
                      color: "blue",
                    }}
                  />
                  <em style={{ marginLeft: "-10px" }}>
                    {speciesData.location}
                  </em>
                  <br />
                  <em>{speciesData.specificname}</em>
                  <br />
                  <em>{speciesData.scientificname}</em>
                  <br />
                  <em>{speciesData.speciescategory}</em>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapSpecies;
