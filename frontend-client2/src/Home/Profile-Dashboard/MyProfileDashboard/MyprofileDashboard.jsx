import React from "react";
import "./MyprofileDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Profile from "../../../Components/Database/Profile/Profile-Page/Profile";

function MyprofileDashboard() {
  return (
    <div className="myprofile-container">
      <div className="myprofile-navbar">
        <Navbar />
      </div>

      <div className="myprofile">
        <Profile />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default MyprofileDashboard;
