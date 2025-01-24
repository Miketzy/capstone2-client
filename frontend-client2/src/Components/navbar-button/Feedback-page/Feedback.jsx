import React, { useState } from "react";
import axios from "axios";

function Feedback() {
  const [rating, setRating] = useState(0); // State for rating
  const [message, setMessage] = useState(""); // State for feedback message

  // Handle rating click (set rating when clicked)
  const handleRatingClick = (value) => {
    setRating(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Make sure both rating and message are present
    if (rating === 0 || message.trim() === "") {
      alert("Please provide both a rating and a message.");
      return;
    }

    try {
      // Send feedback data to the backend API
      const response = await axios.post(
        "https://capstone2-client.onrender.com/submit-feedback", // Backend endpoint
        { rating, message },
        { withCredentials: true } // Ensure cookies (JWT) are sent
      );
      alert("Feedback submitted successfully!"); // Alert success
    } catch (error) {
      // Error handling
      if (error.response) {
        // If there is a response from the backend with an error
        alert("Error: " + error.response.data);
      } else {
        // Other errors (e.g., network issues)
        alert("An error occurred while submitting feedback.");
      }
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ paddingTop: "80px" }} // Add padding to account for navbar height
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Give Us Your Feedback
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Rating:</label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`text-5xl ${
                    rating >= value ? "text-yellow-500" : "text-gray-300"
                  } hover:text-yellow-400 focus:outline-none`}
                  onClick={() => handleRatingClick(value)} // Set rating on click
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Handle input change
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
