import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    axios
      .post("https://capstone2-client.onrender.com/send-otp", { email })
      .then((response) => {
        setMessage(response.data);
        navigate("/Enter-Otp", { state: { email } });
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data);
        } else {
          setMessage("An error occurred while sending the OTP.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const GoToLogin = async () => {
    try {
      await axios.post("https://capstone2-client.onrender.com/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/images/wmremove-transformed.jpeg')" }} // Changed background to match bio explorer theme
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/3 bg-opacity-90">
        <h2 className="text-3xl font-semibold text-center text-green-800 mb-6">
          BioExplorer Email Request
        </h2>

        <div className="mb-4">
          <p className="text-gray-700 text-center mb-4">
            We'll send an OTP code to your email for verification
          </p>
          <input
            id="otp-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" // Focus color changed to green for bio explorer theme
            required
          />
        </div>

        <button
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={handleSendOTP}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <p className="text-center text-sm mt-4 text-green-500 cursor-pointer">
          Go back to{" "}
          <span className="underline" onClick={GoToLogin}>
            Login
          </span>
        </p>

        {message && (
          <p className="text-red-500 text-center mt-4" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EnterEmail;
