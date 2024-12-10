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
      .post("http://localhost:8080/send-otp", { email })
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
      .post("http://localhost:8081/verify-otp", { email, otp: otpCode })
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
        backgroundImage: "url('/picture/durso.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md bg-opacity-80">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Email Verification
        </h1>
        {email && (
          <p className="text-center text-gray-600 mb-4">
            OTP has been sent to: <span className="font-semibold">{email}</span>
          </p>
        )}
        <div className="flex justify-center space-x-2 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              name={`otp${index}`}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              maxLength="1"
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              inputMode="numeric"
            />
          ))}
        </div>
        <button
          onClick={handleVerifyOTP}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        >
          Verify Account
        </button>
        <div className="text-center text-gray-600">
          <p>
            {canResend
              ? "You can resend the OTP."
              : `Resend OTP in ${timer} seconds`}
          </p>
          {canResend && (
            <p
              className="text-blue-500 cursor-pointer hover:underline"
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
