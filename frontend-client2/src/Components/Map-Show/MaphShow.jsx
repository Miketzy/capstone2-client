import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API_URL from "../../Config";

// Custom icon for the map marker
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

// Component to fly to selected species location on map
function FlyToSelectedSpecies({ selectedSpecies }) {
  const map = useMap();

  useEffect(() => {
    if (
      selectedSpecies &&
      selectedSpecies.latitude &&
      selectedSpecies.longitude
    ) {
      map.flyTo([selectedSpecies.latitude, selectedSpecies.longitude], 15);
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
    <div className="flex flex-col md:flex-row gap-4">
      {/* IMAGE CONTAINER */}
      <div className="w-full md:w-1/2 max-h-[400px] overflow-hidden rounded shadow-lg">
        {selectedSpecies?.image ? (
          <img
            src={selectedSpecies.image}
            alt={selectedSpecies.commonname}
            className="w-full h-full object-cover"
            style={{ maxHeight: "400px" }}
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* MAP CONTAINER */}
      <div className="w-full md:w-1/2 min-h-[400px] max-h-[400px] rounded shadow-lg">
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
          <FlyToSelectedSpecies selectedSpecies={selectedSpecies} />
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
    </div>
  );
}

export default MaphShow;
