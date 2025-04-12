import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../../Config";

function Feedback() {
  const [rating, setRating] = useState(0); // rating state is used to track the rating value
  const [message, setMessage] = useState("");

  // Function to handle the rating click
  const handleRatingClick = (value) => {
    setRating(value); // Update the rating state when a star is clicked
  };

  // Function to handle feedback form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/submit-feedback`,
        { rating, message },
        { withCredentials: true }
      );
      alert(response.data); // Alert success message from backend
    } catch (error) {
      if (error.response) {
        console.log("Error details:", error.response.data); // Check the exact error response
        alert("Error: " + error.response.data);
      } else {
        alert("An error occurred while submitting feedback.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ paddingTop: "80px" }}
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
                  onClick={() => handleRatingClick(value)}
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
              onChange={(e) => setMessage(e.target.value)}
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
