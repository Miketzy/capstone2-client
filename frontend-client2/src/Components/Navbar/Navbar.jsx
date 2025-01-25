import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoPerson } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    image: "/picture/Unknown_Member.jpg",
  });

  const [activeTab, setActiveTab] = useState(location.pathname);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

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
        alert("An error occurred while fetching user data. Please try again.");
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveTab(path);
  };

  const handleMyprofile = () => {
    navigate("/My-Profile");
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        await axios.post("https://capstone2-client.onrender.com/logout");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Error during logout", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="navbar bg-green-800 text-white py-2 ml-10px shadow-lg rounded-b-md">
      <div className="mx-auto flex justify-between items-center p-3">
        <div className="md:hidden cursor-pointer" onClick={toggleSidebar}>
          <MenuIcon />
        </div>

        <div className="menu-items flex space-x-6">
          <ul className="flex space-x-6">
            <li
              className={activeTab === "/Home" ? "active" : ""}
              onClick={() => handleNavigation("/Home")}
            >
              <span>HOME</span>
            </li>
            <li
              className={activeTab === "/About-us" ? "active" : ""}
              onClick={() => handleNavigation("/About-us")}
            >
              <span>ABOUT US</span>
            </li>
            <li
              className={activeTab === "/Features" ? "active" : ""}
              onClick={() => handleNavigation("/Features")}
            >
              <span>FEATURES</span>
            </li>
            <li
              className={activeTab === "/Feedback" ? "active" : ""}
              onClick={() => handleNavigation("/Feedback")}
            >
              <span>FEEDBACK</span>
            </li>
          </ul>
        </div>

        <div
          className="profileimg-button flex items-center space-x-3 cursor-pointer justify-start"
          onClick={handleClick}
        >
          <div className="img-container relative">
            <div className="img-profile border-2 border-green-300 rounded-full overflow-hidden">
              <img src={user.image} alt="profile" className="w-16 h-16" />
            </div>
            <div className="profile-info mt-2">
              <h3 className="fname text-lg font-semibold">{`${user.firstname} ${user.lastname}`}</h3>
              <p className="email text-sm text-gray-300">{user.email}</p>
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
          classes={{ paper: "customMenu" }}
        >
          <MenuItem onClick={handleMyprofile}>
            <ListItemIcon>
              <IoPerson className="text-green-700" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <IoLogOut className="text-red-700" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
