import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import MenuIcon from "@mui/icons-material/Menu";

const FrontpageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home"); // Track active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link
  };

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
            {[
              { href: "/frontpagehome", label: "Home" },
              { href: "#about", label: "About the Project" },
              { href: "#team", label: "Team" },
              { href: "#developer", label: "Developer" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href} // Use `to` instead of `href` for client-side routing
                onClick={() => handleLinkClick(link.href)}
                className={`relative hover:text-green-300 transition duration-300 ${
                  activeLink === link.href ? "text-green-300" : ""
                }`}
              >
                {link.label}
                {/* Underline */}
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-green-300 transition-all duration-300 ${
                    activeLink === link.href
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                />
              </Link>
            ))}
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
          {[
            { href: "/frontpagehome", label: "Home" },
            { href: "#about", label: "About the Project" },
            { href: "#team", label: "Team" },
            { href: "#developer", label: "Developer" },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href} // Use `to` instead of `href` for client-side routing
              onClick={() => handleLinkClick(link.href)}
              className={`block px-4 py-2 hover:bg-green-600 transition duration-300 ${
                activeLink === link.href ? "bg-green-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default FrontpageNavbar;
