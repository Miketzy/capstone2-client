import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EnterEmail.css";

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
      .post("http://localhost:8081/send-otp", { email })
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
      await axios.post("http://localhost:8081/logout");

      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="email-request">
      <div className="email-request-container">
        <h2>EMAIL REQUEST</h2>
        <div className="email-send">
          <p>We will be sending you a OTP code to your email</p>
          <input
            id="otp-email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button
          className="email-otp-button"
          onClick={handleSendOTP}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <p className="gobacktoLog">
          Go back to <span onClick={GoToLogin}>Login</span>
        </p>
        {message && <p aria-live="polite">{message}</p>}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default EnterEmail;
