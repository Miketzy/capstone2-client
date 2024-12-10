import React, { useState, useEffect } from "react";
import "./Database.css";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CloseIcon from "@mui/icons-material/Close";

function Database() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]); // State for filtered images
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate(); // Initialize navigate

  const openModal = (species) => {
    const imageUrl = `http://localhost:8080/uploads/images/${species.uploadimage}`; // Use the correct path for the images
    setSelectedImage(imageUrl);
    setSelectedSpecies(species);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedSpecies(null);
  };

  // Fetch images from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/images")
      .then((response) => {
        console.log("Fetched images:", response.data);
        setImages(response.data); // Set the fetched images to state
        setFilteredImages(response.data); // Initialize filtered images
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [selectedImage]);

  // Filter images based on the search term
  // Filter images based on the search term and sort alphabetically
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
      .sort((a, b) => a.commonname.localeCompare(b.commonname)); // Sort alphabetically by common name

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
            value={searchTerm} // Bind the search input value to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <i className="fas fa-search search-icon text-gray-500 ml-2"></i>
        </div>
      </div>

      {/* Gallery */}
      <div className="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {filteredImages.length > 0 ? (
          filteredImages.map((species) => {
            const imageUrl = `http://localhost:8080/uploads/images/${species.uploadimage}`; // Correct URL
            return (
              <div
                className="gallery-item cursor-pointer relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                key={species.id}
                onClick={() => openModal(species)} // Open modal with the entire species object
              >
                <img
                  src={imageUrl} // Use the constructed image URL
                  alt={species.commonname}
                  className="gallery-image w-full h-64 "
                />
                <h3 className="title-commonname text-center mt-2 text-lg font-semibold text-gray-800">
                  {species.commonname}
                </h3>
              </div>
            );
          })
        ) : (
          <p>No images available.</p> // Message if no images are available
        )}
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="page1-container">
            <span className="close-icon" onClick={closeModal}>
              <CloseIcon />
            </span>
            <img
              src={selectedImage} // Use the correct image URL here
              alt="Selected"
              className="modal-image"
            />
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

              <button className="modal-mapping" onClick={handleMappingClick}>
                Mapping
              </button>
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
