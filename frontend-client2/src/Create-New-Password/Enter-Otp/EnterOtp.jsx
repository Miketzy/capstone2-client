import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EnterOtp() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);

    setOtp(newOtp);

    if (value && index < newOtp.length - 1) {
      const nextInput = document.querySelector(`input[name="otp${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      const prevInput = document.querySelector(`input[name="otp${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(60);
    setCanResend(false);
    axios
      .post("https://capstone2-client.onrender.com/send-otp", { email })
      .then(() => {
        alert("OTP has been resent to your email.");
      })
      .catch(() => {
        alert("Error resending OTP.");
      });
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join("");
    axios
      .post("https://capstone2-client.onrender.com/verify-otp", {
        email,
        otp: otpCode,
      })
      .then((response) => {
        if (response.data.success) {
          alert("OTP verified successfully!");
          navigate("/Enter-new-password", { state: { email } });
        } else {
          alert("Invalid OTP. Please try again.");
          setOtp(["", "", "", "", "", ""]);
        }
      })
      .catch(() => {
        alert("An error occurred while verifying OTP.");
      });
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-4"
      style={{
        backgroundImage: "url('/picture/wmremove-transformed.jpeg')", // Updated background image for BioExplorer theme
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
        <h1 className="text-3xl font-semibold text-center text-green-700 mb-6">
          BioExplorer - Email Verification
        </h1>
        {email && (
          <p className="text-center text-gray-700 mb-6">
            OTP has been sent to: <span className="font-semibold">{email}</span>
          </p>
        )}
        <div className="flex justify-center space-x-3 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              name={`otp${index}`}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              maxLength="1"
              className="w-14 h-14 text-center text-xl border-2 border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              inputMode="numeric"
            />
          ))}
        </div>
        <button
          onClick={handleVerifyOTP}
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
        >
          Verify OTP
        </button>
        <div className="text-center text-gray-700">
          <p>
            {canResend
              ? "You can now resend the OTP."
              : `Resend OTP in ${timer} seconds`}
          </p>
          {canResend && (
            <p
              className="text-green-500 cursor-pointer hover:underline"
              onClick={handleResendOTP}
            >
              Resend OTP
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnterOtp;
