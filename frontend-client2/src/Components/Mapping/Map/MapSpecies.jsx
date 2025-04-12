import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import API_URL from "../../../Config"; // Dalawang level up ✅

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41], // Size of the shadow
});

function MapSpecies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesData, setSpeciesData] = useState([]);
  const [error, setError] = useState("");
  const [mapPosition, setMapPosition] = useState([7.1529, 126.4517]); // Default map position (Davao Oriental)
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const commonName = params.get("commonname");
    if (commonName) {
      setSearchTerm(commonName);
      handleSearch(commonName);
    }
  }, [location]);

  const handleSearch = async (term) => {
    try {
      setError("");
      const response = await axios.get(
        `${API_URL}/api/species?name=${term || searchTerm}`
      );

      if (response.data && response.data.length > 0) {
        setSpeciesData(response.data);
        const firstResult = response.data.find(
          (species) => species.latitude && species.longitude
        );

        // Focus the map on the first result with coordinates
        if (firstResult) {
          setMapPosition([firstResult.latitude, firstResult.longitude]);
        } else {
          setError("No valid location for the searched species.");
          setMapPosition([7.1529, 126.4517]); // Default position
        }
      } else {
        setError("No species found.");
        setSpeciesData([]);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching species data.");
      setSpeciesData([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search species"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <button
            onClick={() => handleSearch()}
            className="px-6 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>

      {/* Map Container */}
      <div className="w-full max-w-5xl h-[500px] rounded-md shadow-lg overflow-hidden">
        <MapContainer center={mapPosition} zoom={10} className="w-full h-full">
          <TileLayer
            url="https://api.maptiler.com/maps/jp-mierune-dark/256/{z}/{x}/{y}.png?key=txroCKKY059zWv1MqNe0"
            attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
          />
          {speciesData
            .filter((species) => species.latitude && species.longitude)
            .map((species, index) => (
              <Marker
                key={index}
                position={[species.latitude, species.longitude]}
                icon={customIcon} // Apply the custom icon here
              >
                <Popup>
                  <div className="flex flex-col items-center space-y-2">
                    {/* Image */}
                    <img
                      src={species.uploadimage} // Use the Cloudinary image URL
                      alt={species.specificname}
                      className="w-32 h-32  rounded-md"
                    />
                    {/* Species Details */}
                    <div className="text-sm text-gray-800 text-center">
                      <strong className="block text-lg font-semibold">
                        {species.commonname}
                      </strong>
                      <div className="flex items-center justify-center text-blue-500">
                        <HiLocationMarker className="mr-1" />
                        <span>{species.location}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapSpecies;
