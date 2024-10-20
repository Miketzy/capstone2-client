import React from "react";
import "./FeedbackDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Feedback from "../../../Components/navbar-button/Feedback-page/Feedback";

function FeedbackDashboard() {
  return (
    <div className="feedback-container">
      <div className="feedback-navbar">
        <Navbar />
      </div>
      <div className="feedback-us">
        <Feedback />
      </div>
    </div>
  );
}

export default FeedbackDashboard;
