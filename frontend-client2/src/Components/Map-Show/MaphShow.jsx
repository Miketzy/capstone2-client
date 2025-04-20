import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API_URL from "../../Config";

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function MaphShow() {
  const [speciesData, setSpeciesData] = useState([]);
  const [mapPosition, setMapPosition] = useState([7.1529, 126.4517]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/species`);
        if (response.data && response.data.length > 0) {
          setSpeciesData(response.data);

          const firstResult = response.data.find(
            (species) => species.latitude && species.longitude
          );
          if (firstResult) {
            setMapPosition([firstResult.latitude, firstResult.longitude]);
          }
        }
      } catch (err) {
        console.error("Error fetching species data:", err);
      }
    };

    fetchSpecies();
  }, []);

  return (
    <div className="w-full h-[500px]">
      {" "}
      {/* Pinalitan ko dito */}
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
              icon={customIcon}
            >
              <Popup>
                <div className="text-center text-gray-800">
                  <strong className="block text-lg font-semibold">
                    {species.commonname}
                  </strong>
                  <div className="flex items-center justify-center text-blue-500 mt-1">
                    <HiLocationMarker className="mr-1" />
                    <span>{species.location}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default MaphShow;
