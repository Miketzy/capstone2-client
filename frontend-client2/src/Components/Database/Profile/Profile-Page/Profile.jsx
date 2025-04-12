import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../../Config";

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
        const res = await axios.get(`${API_URL}/`, {
          withCredentials: true,
        });
        console.log("Fetched profile data:", res.data); // Log response

        // Access the user data from the response
        const user = res.data.user; // Get user object from response

        const imageUrl = user.image
          ? `${API_URL}/images/${user.image}`
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
          navigate("/login"); // Redirect to login if unauthorized
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserData(); // Invoke the function to fetch user data
  }, [navigate]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen  py-4 pt-24 ">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 border border-gray-300">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">My Profile</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center space-x-6">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0">
              <img
                className="w-full h-full object-cover"
                src={userData.image}
                alt="Profile"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col space-y-2">
              <p className="text-lg font-medium text-gray-600">
                <strong>Name:</strong> {userData.firstname}{" "}
                {userData.middlename} {userData.lastname}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p className="text-lg font-medium text-gray-600">
                <strong>Address:</strong> {userData.address}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleEditprofile}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
            >
              Edit Profile
            </button>
            <button
              onClick={handleChangePassword}
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
