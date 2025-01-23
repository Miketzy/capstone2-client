import React from "react";
import { Player } from "@lottiefiles/react-lottie-player"; // Lottie Player for animations

const FrontpageHome = () => {
  return (
    <div className="bg-green-100 min-h-screen flex flex-col justify-center items-center text-center">
      {/* Animation Section */}
      <div className="w-3/4 md:w-1/2 lg:w-1/3 mb-6">
        <Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/packages/lf20_s1u7hjvj.json" // Replace with a species-related animation URL
          style={{ height: "300px", width: "300px" }}
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
