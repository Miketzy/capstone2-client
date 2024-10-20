import React from "react";
import "./EditProfileDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import EditProfile from "../../../Components/Database/Profile/Edit-{rofile-Page/EditProfile";

function EditProfileDashboard() {
  return (
    <div className="editprofile-container">
      <div className="editprofile-navbar">
        <Navbar />
      </div>

      <div className="myprofile">
        <EditProfile />
      </div>
    </div>
  );
}

export default EditProfileDashboard;
