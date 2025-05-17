import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

// Component para mag move at zoom yung mapa kapag may selected species
function FlyToSelectedSpecies({ selectedSpecies }) {
  const map = useMap();

  useEffect(() => {
    if (
      selectedSpecies &&
      selectedSpecies.latitude &&
      selectedSpecies.longitude
    ) {
      map.flyTo([selectedSpecies.latitude, selectedSpecies.longitude], 15); // Zoom level 15 para close-up
    }
  }, [selectedSpecies, map]);

  return null;
}

function MaphShow({ selectedSpecies }) {
  const [speciesData, setSpeciesData] = useState([]);
  const [mapPosition, setMapPosition] = useState([7.1529, 126.4517]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/species`);
        if (response.data && response.data.length > 0) {
          setSpeciesData(response.data);
        }
      } catch (err) {
        console.error("Error fetching species data:", err);
      }
    };

    fetchSpecies();
  }, []);

  useEffect(() => {
    if (
      selectedSpecies &&
      selectedSpecies.latitude &&
      selectedSpecies.longitude
    ) {
      setMapPosition([selectedSpecies.latitude, selectedSpecies.longitude]);
    }
  }, [selectedSpecies]);

  return (
    <div className="w-full h-[400px]">
      <MapContainer
        center={mapPosition}
        zoom={10}
        className="w-full h-full"
        key={mapPosition.toString()}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/jp-mierune-dark/256/{z}/{x}/{y}.png?key=txroCKKY059zWv1MqNe0"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />
        <FlyToSelectedSpecies selectedSpecies={selectedSpecies} />{" "}
        {/* Dito ko pinasok para mag zoom-in */}
        {selectedSpecies &&
        selectedSpecies.latitude &&
        selectedSpecies.longitude ? (
          <Marker
            position={[selectedSpecies.latitude, selectedSpecies.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center text-gray-800">
                <strong className="block text-lg font-semibold">
                  {selectedSpecies.commonname}
                </strong>
                <div className="flex items-center justify-center text-blue-500 mt-1">
                  <HiLocationMarker className="mr-1" />
                  <span>{selectedSpecies.location}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ) : (
          speciesData
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
            ))
        )}
      </MapContainer>
    </div>
  );
}

export default MaphShow;
