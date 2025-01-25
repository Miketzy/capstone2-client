import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react"; // Icon library

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
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/picture/wmremove-transformed.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/3 bg-opacity-90">
        <div className="flex justify-center mb-4">
          <Mail className="text-green-600 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Request OTP Code
        </h2>
        <p className="text-gray-700 text-center mb-4">
          Enter your email below to receive a one-time password for
          verification.
        </p>
        <div className="mb-4">
          <input
            id="otp-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
          onClick={handleSendOTP}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Go back to{" "}
          <span
            className="underline text-green-600 cursor-pointer hover:text-green-700"
            onClick={GoToLogin}
          >
            Login
          </span>
        </p>

        {message && (
          <p
            className="text-red-500 text-center mt-4 font-medium"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EnterEmail;
