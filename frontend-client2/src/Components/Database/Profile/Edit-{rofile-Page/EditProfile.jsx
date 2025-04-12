import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleDotted } from "react-icons/bs";
import API_URL from "../../../../Config";

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${API_URL}/`, {
          withCredentials: true,
        });

        const user = res.data.user;
        const imageUrl = user.image
          ? `${API_URL}/images/${user.image}`
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
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", userData.firstname);
    formData.append("middlename", userData.middlename);
    formData.append("lastname", userData.lastname);
    formData.append("email", userData.email);
    formData.append("gender", userData.gender);
    formData.append("address", userData.address);
    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/profile`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUserData(res.data);
        setSelectedImage(
          res.data.image
            ? `https://capstone2-client.onrender.com/images/${res.data.image}`
            : "/picture/Unknown_Member.jpg"
        );
        alert("Profile updated successfully");
        navigate("/My-Profile");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (err) {
      alert("Failed to update profile. Please check your input.");
    }
  };

  return (
    <div className="min-h-screen  pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-[-5vh] border border-gray-300">
        {/* Profile Image Section */}
        <div className="relative flex justify-center items-center mb-6">
          <label htmlFor="profile-imgInput" className="cursor-pointer">
            <input
              type="file"
              id="profile-imgInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <BsPlusCircleDotted className="absolute bottom-0 left-1/2 text-4xl text-blue-500 transform -translate-x-1/2 mb-2" />
          </label>
          <img
            src={selectedImage ? selectedImage : userData.image}
            alt="Profile"
            className="rounded-full border-4 border-gray-300 mt-4"
            width="180"
            height="180"
          />
        </div>

        {/* Form Fields Section */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstname" className="block text-gray-700">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={userData.firstname}
                onChange={(e) =>
                  setUserData({ ...userData, firstname: e.target.value })
                }
                placeholder="Enter your Firstname"
              />
            </div>

            {/* Middle Name */}
            <div className="form-group">
              <label htmlFor="middlename" className="block text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                id="middlename"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={userData.middlename}
                onChange={(e) =>
                  setUserData({ ...userData, middlename: e.target.value })
                }
                placeholder="Enter your Middle Name"
              />
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastname" className="block text-gray-700">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={userData.lastname}
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
                placeholder="Enter your Lastname"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="Enter your Email"
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={userData.gender}
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

            {/* Address */}
            <div className="form-group col-span-2">
              <label htmlFor="address" className="block text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                placeholder="Enter your Address"
              />
            </div>
          </div>

          {/* Save & Cancel Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/My-Profile")}
              className="bg-gray-300 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <br />
    </div>
  );
};

export default EditProfile;
