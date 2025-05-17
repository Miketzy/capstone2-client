import React, { useState, useEffect } from "react";
import "./Database.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import API_URL from "../../../Config";
import MaphShow from "../../Map-Show/MaphShow";

function Database() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const openModal = (species) => {
    setSelectedImage(species.uploadimage);
    setSelectedSpecies(species);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedSpecies(null);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/images`)
      .then((response) => {
        console.log("Fetched images:", response.data);
        setImages(response.data);
        setFilteredImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  useEffect(() => {
    const results = images
      .filter((species) =>
        [
          species.specificname,
          species.scientificname,
          species.commonname,
          species.speciescategory,
          species.conservationstatus,
        ].some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => a.commonname.localeCompare(b.commonname));

    setFilteredImages(results);
  }, [searchTerm, images]);

  const handleMappingClick = () => {
    if (selectedSpecies) {
      navigate(`/mapping?commonname=${selectedSpecies.commonname}`);
    }
  };

  return (
    <div className="Database flex flex-col items-center  p-4">
      {/* Search Bar */}
      <div className="search-bar-container w-full max-w-2xl mb-8">
        <div className="search-bar-wrapper flex items-center border border-gray-300 rounded-lg p-2">
          <input
            type="text"
            placeholder="Search the species..."
            aria-label="Search"
            className="search-input w-full p-2 rounded-lg focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon text-gray-500 ml-2"></i>
        </div>
      </div>

      {/* Gallery */}
      <div className="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {filteredImages.length > 0 ? (
          filteredImages.map((species) => (
            <div
              className="gallery-item cursor-pointer relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              key={species.id}
              onClick={() => openModal(species)}
            >
              <img
                src={species.uploadimage}
                alt={species.commonname}
                className="gallery-image w-full h-64 "
              />
              <h3 className="title-commonname text-center mt-2 text-lg font-semibold text-gray-800">
                {species.commonname}
              </h3>
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="page1-container">
            <span className="close-icon" onClick={closeModal}>
              <CloseIcon />
            </span>
            <div className="p-4 md:p-8">
              {/* Main Image */}
              <img
                src={selectedImage}
                alt="Selected"
                className="w-[100px] max-h-[400px] object-contain rounded-lg"
              />

              {/* Thumbnails */}
              {selectedSpecies &&
                (() => {
                  const thumbnails = [
                    selectedSpecies.uploadimage,
                    selectedSpecies.uploadimage1,
                    selectedSpecies.uploadimage2,
                    selectedSpecies.uploadimage3,
                  ].filter(Boolean); // Removes null/undefined images

                  return (
                    <div className="flex gap-4 mt-4 justify-center flex-wrap">
                      {thumbnails.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`thumbnail-${index}`}
                          onClick={() => setSelectedImage(img)}
                          className={`w-20 h-14 object-cover rounded-md cursor-pointer
                          border-4 transition-all duration-200
                          ${
                            selectedImage === img
                              ? "border-blue-500 opacity-100"
                              : "border-gray-300 opacity-70"
                          }`}
                        />
                      ))}
                    </div>
                  );
                })()}
            </div>

            <div className="title-text">
              <h3 className="line1">
                Specific Name:{" "}
                <span>
                  {selectedSpecies?.specificname || "Insufficient data"}
                </span>
              </h3>
              <h3 className="line2">
                Scientific Name:{" "}
                <span>
                  {selectedSpecies?.scientificname || "Insufficient data"}
                </span>
              </h3>
              <h3 className="line3">
                Common Name:{" "}
                <span>
                  {selectedSpecies?.commonname || "Insufficient data"}
                </span>
              </h3>
              <h3 className="line4">
                Classification:{" "}
                <span>
                  {selectedSpecies?.speciescategory || "Insufficient data"}
                </span>
              </h3>
              <h3 className="line5">
                Conservation Status:{" "}
                <span>
                  {selectedSpecies?.conservationstatus || "Insufficient data"}
                </span>
              </h3>
              <h3 className="line6">
                Habitat:{" "}
                <span>{selectedSpecies?.habitat || "Insufficient data"}</span>
              </h3>

              <div onClick={handleMappingClick} style={{ cursor: "pointer" }}>
                <MaphShow selectedSpecies={selectedSpecies} />
              </div>
            </div>
          </div>

          <div className="page2-container">
            <div className="description-page">
              <h1>Description</h1>
              <p>{selectedSpecies?.description || "Insufficient data"}</p>
            </div>
          </div>

          <div className="page3-container">
            <div className="threats-page">
              <h1>Threats</h1>
              <p className="par1">
                {selectedSpecies?.threats || "Insufficient data"}
              </p>
            </div>
          </div>

          <div className="page4-container">
            <div className="population-page">
              <h1>Population</h1>
              <p>{selectedSpecies?.population || "Insufficient data"}</p>
            </div>
          </div>

          <div className="page5-container">
            <div className="conservation-page">
              <h1>Conservation Effort</h1>
              <p>
                {selectedSpecies?.conservationeffort || "Insufficient data"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Database;
