import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const FrontpageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Custom Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-green-200"
              >
                <circle cx="12" cy="12" r="10" className="text-green-300" />
                <path
                  d="M15.5 15.5l4 4m-8.5-9a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M10 10c-2.5 2.5-4 6-4 6s3.5-1.5 6-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-wide">
              BioExplorer
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="hover:text-green-300 transition duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-green-300 transition duration-300"
            >
              About the Project
            </a>
            <a
              href="#team"
              className="hover:text-green-300 transition duration-300"
            >
              Team
            </a>
            <a
              href="#developer"
              className="hover:text-green-300 transition duration-300"
            >
              Developer
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800">
          <a
            href="#home"
            className="block px-4 py-2 hover:bg-green-600 transition duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 hover:bg-green-600 transition duration-300"
          >
            About the Project
          </a>
          <a
            href="#team"
            className="block px-4 py-2 hover:bg-green-600 transition duration-300"
          >
            Team
          </a>
          <a
            href="#developer"
            className="block px-4 py-2 hover:bg-green-600 transition duration-300"
          >
            Developer
          </a>
        </div>
      )}
    </nav>
  );
};

export default FrontpageNavbar;
