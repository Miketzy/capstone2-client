import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const images = [
  "/picture/image1.jpg",
  "/picture/image2.jpg",
  "/picture/image3.jpg",
  // Add more image URLs as needed
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <img src={images[currentIndex]} alt="Slider" className="slider-image" />
      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
