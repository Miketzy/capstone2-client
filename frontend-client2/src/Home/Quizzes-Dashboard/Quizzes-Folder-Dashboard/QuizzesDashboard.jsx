import React from "react";
import "./QuizzesDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Quizzes from "../../../Components/Quizzes-pages/Quizzes-Folder/Quizzes";

function QuizzesDashboard() {
  return (
    <div className="databasehome">
      <div className="quizes-navbarTop">
        <Navbar />
      </div>
      <div className="quizes-content">
        <Quizzes />
      </div>
    </div>
  );
}

export default QuizzesDashboard;
