import React from "react";

const FrontpageHome = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center text-center">
      {/* Animation Section */}
      <div className="w-3/4 md:w-1/2 lg:w-1/3 mb-6">
        <img
          src={
            process.env.PUBLIC_URL +
            "/picture/DALL·E 2025-01-24 14.09.37 - A visually stunning background representing biodiversity exploration and species documentation. The scene features a lush rainforest with diverse flor.webp"
          }
          alt="Biodiversity Exploration"
          className="w-full h-auto"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
        Welcome to BioExplorer
      </h1>
      <p className="text-lg md:text-xl text-green-700 mb-8">
        Discover and explore a diverse range of species like never before.
      </p>

      {/* Proceed Button */}
      <button
        onClick={() => (window.location.href = "/login")} // Replace with your desired route
        className="px-6 py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
      >
        Proceed
      </button>
    </div>
  );
};

export default FrontpageHome;
