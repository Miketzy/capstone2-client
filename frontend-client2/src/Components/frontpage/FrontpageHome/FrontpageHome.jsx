import React, { useEffect } from "react";
import "./front.css";

const FrontpageHome = () => {
  useEffect(() => {
    // Remove scroll by disabling body overflow
    document.body.style.overflow = "hidden";

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      {/* Animation Section */}
      <div className="w-3/4 md:w-1/2 lg:w-1/3 mb-6 mx-auto">
        <img
          src={
            process.env.PUBLIC_URL +
            "/picture/472546830_1138798994617879_5773074804155834205_n-removebg-preview.png"
          }
          alt="Biodiversity Exploration"
          className="w-40 h-auto mx-auto animate-bounce" // Add animation class here
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
        Welcome to BioExplorer
      </h1>
      <p className="text-lg md:text-xl text-green-700 mb-8">
        Discover and explore a diverse range of species like never before.
      </p>

      {/* Buttons Section - Horizontally aligned */}
      <div className="flex space-x-4">
        {/* Proceed Button */}
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-6 py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
        >
          Login
        </button>

        {/* Learn More Button */}
        <button
          onClick={() => (window.location.href = "/about-the-project")}
          className="px-6 py-3 bg-transparent border-2 border-green-700 text-green-700 rounded-lg shadow-lg hover:bg-green-700 hover:text-white transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FrontpageHome;
