import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoPerson } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    image: "/picture/Unknown_Member.jpg",
  });

  // State for active tab based on the current location
  const [activeTab, setActiveTab] = useState(location.pathname);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const fetchUserData = () => {
    axios
      .get("http://localhost:8081/", { withCredentials: true })
      .then((response) => {
        if (response.data.message === "Profile retrieved successfully") {
          setUser({
            firstname: response.data.user.firstname || "",
            middlename: response.data.user.middlename || "",
            lastname: response.data.user.lastname || "",
            email: response.data.user.email || "",
            image: response.data.user.image
              ? `http://localhost:8081/images/${response.data.user.image}`
              : "/picture/Unknown_Member.jpg",
          });
        } else {
          alert("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data. Please try again.");
      });
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Use effect to update active tab when location changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveTab(path); // Update active tab immediately after navigation
  };

  const handleMyprofile = () => {
    navigate("/My-Profile");
  };

  const handleLogout = async () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        // Call the logout endpoint
        await axios.post("http://localhost:8081/logout");

        // Optionally, clear the token from localStorage (if stored)
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate("/"); // Make sure you import and use 'navigate' from 'react-router-dom'
      } catch (error) {
        console.error("Error during logout", error);
      }
    } else {
      // If user clicks "No", do nothing and stay on the current page
      return;
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="code">
          <ul>
            <li
              className={activeTab === "/Home" ? "active" : ""}
              onClick={() => handleNavigation("/Home")}
            >
              <span>HOME</span>
            </li>
          </ul>
        </div>

        <div className="code">
          <ul>
            <li
              className={activeTab === "/About-us" ? "active" : ""}
              onClick={() => handleNavigation("/About-us")}
            >
              <span>ABOUT US</span>
            </li>
          </ul>
        </div>

        <div className="code">
          <ul>
            <li
              className={activeTab === "/Features" ? "active" : ""}
              onClick={() => handleNavigation("/Features")}
            >
              <span>FEATURES</span>
            </li>
          </ul>
        </div>

        <div className="code">
          <ul>
            <li
              className={activeTab === "/Feedback" ? "active" : ""}
              onClick={() => handleNavigation("/Feedback")}
            >
              <span>FEEDBACK</span>
            </li>
          </ul>
        </div>

        <div className="profileimg-button" onClick={handleClick}>
          <div className="img-container">
            <div className="img-profile">
              <img src={user.image} alt="" />
            </div>
            <div className="profile-info">
              <h3 className="fname">{`${user.firstname} ${user.lastname}`}</h3>
              <p className="email">{user.email}</p>
            </div>
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleMyprofile}>
            <ListItemIcon>
              <IoPerson className="ioPerson" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <IoLogOut className="ioLogout" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;