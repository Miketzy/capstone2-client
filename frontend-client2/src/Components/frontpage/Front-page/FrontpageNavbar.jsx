import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import MenuIcon from "@mui/icons-material/Menu";

const FrontpageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const [activeLink, setActiveLink] = useState(location.pathname); // Initialize with the current path

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link immediately
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="sticky top-0 z-50 bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Updated Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/picture/472546830_1138798994617879_5773074804155834205_n-removebg-preview.png"
                }
                alt="BioExplorer Logo"
                className="w-full h-auto"
              />
            </div>
            <span className="text-2xl font-bold tracking-wide">
              BioExplorer
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about-the-project", label: "About the Project" },
              { href: "/team", label: "Team" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href} // Use `to` for routing
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
            { href: "/", label: "Home" },
            { href: "/about-the-project", label: "About the Project" },
            { href: "/team", label: "Team" },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href} // Use `to` for routing
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
