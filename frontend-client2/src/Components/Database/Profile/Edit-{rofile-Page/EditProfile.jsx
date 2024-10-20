import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleDotted } from "react-icons/bs";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    gender: "",
    address: "",
    username: "",
    image: "/picture/Unknown_Member.jpg",
  });
  const navigate = useNavigate();

  // Handle image input and set the preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/", {
          withCredentials: true,
        });

        const user = res.data.user;
        const imageUrl = user.image
          ? `http://localhost:8081/images/${user.image}`
          : "./picture/Unknown_Member.jpg";

        setUserData({
          firstname: user.firstname || "",
          middlename: user.middlename || "",
          lastname: user.lastname || "",
          email: user.email || "",
          gender: user.gender || "",
          address: user.address || "",
          username: user.username || "",
          image: imageUrl,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response && err.response.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData();
    formData.append("firstname", userData.firstname);
    formData.append("middlename", userData.middlename);
    formData.append("lastname", userData.lastname);
    formData.append("email", userData.email);
    formData.append("gender", userData.gender); // Ensure this is included
    formData.append("address", userData.address);
    if (image) {
      formData.append("image", image); // Ensure this is included
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    console.log("Form Data before sending:", {
      firstname: userData.firstname,
      middlename: userData.middlename,
      lastname: userData.lastname,
      email: userData.email,
      gender: userData.gender,
      address: userData.address,
      image: image,
    });

    try {
      const res = await axios.put("http://localhost:8081/profile", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers for authentication
        },
      });

      console.log("Response from update:", res);

      // Check for successful response
      if (res.status === 200) {
        console.log("Profile updated:", res.data);
        setUserData(res.data);
        setSelectedImage(
          res.data.image
            ? `http://localhost:8081/images/${res.data.image}`
            : "/picture/Unknown_Member.jpg"
        );

        alert("Profile updated successfully");
        navigate("/My-Profile");
      } else {
        console.error("Failed to update profile:", res.data);
        alert("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response) {
        console.error("Status code:", err.response.status);
        console.error("Response data:", err.response.data);
      }
      alert("Failed to update profile. Please check your input.");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile">
        <div className="edit-profile-cards edit-profile-imgholder">
          <label htmlFor="profile-imgInput" className="profile-upload">
            <input
              type="file"
              id="profile-imgInput"
              accept="image/*"
              onChange={handleImageChange}
            />
            <BsPlusCircleDotted className="profile-icon" />
          </label>
          <img
            src={selectedImage ? selectedImage : userData.image}
            alt="Profile"
            width="180"
            height="181"
          />
        </div>
      </div>

      <div className="edit-profile-inputfield">
        <div className="edit-profile-inputfield-1">
          <div className="edit-profile-1">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              placeholder="Enter your Firstname"
              value={userData.firstname || ""}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
            />
          </div>

          <div className="edit-profile-1">
            <label htmlFor="middlename">Middle Name</label>
            <input
              type="text"
              placeholder="Enter your Middle Name"
              value={userData.middlename || ""}
              onChange={(e) =>
                setUserData({ ...userData, middlename: e.target.value })
              }
            />
          </div>
        </div>

        <div className="edit-profile-inputfield-2">
          <div className="edit-profile-1">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              placeholder="Enter your Lastname"
              value={userData.lastname || ""}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </div>

          <div className="edit-profile-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={userData.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="edit-profile-inputfield-2">
          <div className="edit-profile-1">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={userData.gender || ""}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="edit-profile-1">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter your Address"
              value={userData.address || ""}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          </div>
        </div>

        <div className="edit-profile-inputfield-2">
          <div className="save-changes-button">
            <button className="edit-button" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>

          <div className="cancel-changesButton">
            <button
              className="cancel-button"
              onClick={() => navigate("/My-Profile")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
