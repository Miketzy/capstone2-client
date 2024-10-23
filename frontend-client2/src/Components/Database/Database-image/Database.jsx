import React, { useState, useEffect } from "react";
import "./Database.css";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Database() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]); // State for filtered images
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate(); // Initialize navigate

  const openModal = (species) => {
    const imageUrl = `http://localhost:8081/uploads/images/${species.uploadimage}`; // Use the correct path for the images
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
  useEffect(() => {
    const results = images.filter((species) =>
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
    );
    setFilteredImages(results);
  }, [searchTerm, images]);

  const handleMappingClick = () => {
    if (selectedSpecies) {
      navigate(`/mapping?commonname=${selectedSpecies.commonname}`);
    }
  };
  return (
    <div className="Database">
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search the species..."
            aria-label="Search"
            className="search-input"
            value={searchTerm} // Bind the search input value to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      <div className="gallery">
        {filteredImages.length > 0 ? (
          filteredImages.map((species) => {
            const imageUrl = `http://localhost:8081/uploads/images/${species.uploadimage}`; // Correct URL
            console.log(`Image URL: ${imageUrl}`); // Log the constructed URL
            return (
              // Return the gallery item
              <div
                className="gallery-item"
                key={species.id}
                onClick={() => openModal(species)} // Open modal with the entire species object
              >
                <img
                  src={imageUrl} // Use the constructed image URL
                  alt={species.commonname}
                  className="gallery-image"
                />
                <h3 className="title-commonname">{species.commonname}</h3>
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
              &times;
            </span>
            <img
              src={selectedImage} // Use the correct image URL here
              alt="Selected"
              className="modal-image"
              style={{ width: "auto", height: "300px" }} // Set width and height
            />
            <div className="title-text">
              <h3>
                Specific Name: <span>{selectedSpecies?.specificname}</span>
              </h3>
              <h3>
                Scientific Name: <span>{selectedSpecies?.scientificname}</span>
              </h3>
              <h3>
                Common Name: <span>{selectedSpecies?.commonname}</span>
              </h3>
              <h3>
                Classification: <span>{selectedSpecies?.speciescategory}</span>
              </h3>
              <h3>
                Conservation Status:{" "}
                <span>{selectedSpecies?.conservationstatus}</span>
              </h3>
              <h3>
                Habitat: <span>{selectedSpecies?.habitat}</span>
              </h3>

              <button className="modal-mapping" onClick={handleMappingClick}>
                Mapping
              </button>
            </div>
          </div>

          <div className="page2-container">
            <div className="description-page">
              <h1>Description</h1>
              <p>{selectedSpecies?.description}</p>
            </div>
          </div>

          <div className="page3-container">
            <div className="threats-page">
              <h1>Threats</h1>
              <p>{selectedSpecies?.threats}</p>
            </div>
          </div>

          <div className="page4-container">
            <div className="population-page">
              <h1>Population</h1>
              <p>{selectedSpecies?.population}</p>
            </div>
          </div>

          <div className="page5-container">
            <div className="conservation-page">
              <h1>Conservation Effort</h1>
              <p>{selectedSpecies?.conservationeffort}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Database;
