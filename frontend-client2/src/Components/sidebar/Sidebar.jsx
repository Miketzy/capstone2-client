import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaHome, FaInfoCircle, FaLeaf, FaComments } from "react-icons/fa";

function Sidebar({ isSidebarVisible }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    image: "/picture/Unknown_Member.jpg",
  });

  // State for active tab based on the current location
  const [activeTab, setActiveTab] = useState(location.pathname);

  // Fetch user data on component mount
  const fetchUserData = () => {
    axios
      .get("https://capstone2-client.onrender.com/", { withCredentials: true })
      .then((response) => {
        if (response.data.message === "Profile retrieved successfully") {
          setUser({
            firstname: response.data.user.firstname || "",
            middlename: response.data.user.middlename || "",
            lastname: response.data.user.lastname || "",
            email: response.data.user.email || "",
            image: response.data.user.image
              ? `https://capstone2-client.onrender.com/images/${response.data.user.image}`
              : "/picture/Unknown_Member.jpg",
          });
        } else {
          alert("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveTab(path);
  };

  return (
    <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
      <div className="side-container">
        <ul>
          <li
            className={activeTab === "/Home" ? "active" : ""}
            onClick={() => handleNavigation("/Home")}
          >
            <FaHome className="icon" />
            <span>Home</span>
          </li>
          <li
            className={activeTab === "/About-us" ? "active" : ""}
            onClick={() => handleNavigation("/About-us")}
          >
            <FaInfoCircle className="icon" />
            <span>About Us</span>
          </li>
          <li
            className={activeTab === "/Features" ? "active" : ""}
            onClick={() => handleNavigation("/Features")}
          >
            <FaLeaf className="icon" />
            <span>Features</span>
          </li>
          <li
            className={activeTab === "/Feedback" ? "active" : ""}
            onClick={() => handleNavigation("/Feedback")}
          >
            <FaComments className="icon" />
            <span>Feedback</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
