import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const handleEditprofile = () => {
    navigate("/Edit-Profile");
  };
  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const [userData, setUserData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    gender: "",
    address: "",
    image: "", // Default image path
  });

  const [loading, setLoading] = useState(true); // Loading state
  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/", {
          withCredentials: true,
        });
        console.log("Fetched profile data:", res.data); // Log response

        // Access the user data from the response
        const user = res.data.user; // Get user object from response

        const imageUrl = user.image
          ? `http://localhost:8081/images/${user.image}`
          : "/picture/Unknown_Member.jpg"; // Default image

        setUserData({
          firstname: user.firstname || "", // Ensure correct field names
          middlename: user.middlename || "",
          lastname: user.lastname || "",
          email: user.email || "",
          gender: user.gender || "",
          address: user.address || "",
          image: imageUrl,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response && err.response.status === 401) {
          navigate("/"); // Redirect to login if unauthorized
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserData(); // Invoke the function to fetch user data
  }, [navigate]);

  return (
    <div className="profile-container">
      <div className="Wrapper">
        <div className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>
          </div>
          <div className="profile-details">
            <div className="profile-image">
              <img src={userData.image} alt="" />
            </div>
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {userData.firstname}{" "}
                {userData.middlename} {userData.lastname}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p>
                <strong>Address:</strong> {userData.address}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            <button onClick={handleEditprofile} className="edit-btn">
              Edit Profile
            </button>
            <button onClick={handleChangePassword} className="password-btn">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
