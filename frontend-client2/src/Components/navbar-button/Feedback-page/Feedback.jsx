import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/submit-feedback", // Pointing to your backend
        { rating, message },
        { withCredentials: true } // Send cookies for token verification
      );
      alert(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data); // Show backend error message
      } else {
        alert("An error occurred while submitting feedback.");
      }
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="Feedback-page">
        <div className="feedback-wrapper">
          <h1>Give Us Your Feedback</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`star ${rating >= value ? "selected" : ""}`}
                    onClick={() => handleRatingClick(value)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
