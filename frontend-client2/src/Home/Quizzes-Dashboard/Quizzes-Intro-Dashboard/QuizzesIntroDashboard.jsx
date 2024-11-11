import React from "react";
import "./QuizzesIntroDashbord.css";

import QuizzesIntro from "../../../Components/Quizzes-pages/Quizes-Intro-folder/QuizzesIntro";
import Navbar from "../../../Components/Navbar/Navbar";

function QuizzesIntroDashboard() {
  return (
    <div className="databasehome">
      <div className="quizesIntro-navbarTop">
        <Navbar />
      </div>
      <div className="quizesIntro-content">
        <QuizzesIntro />
      </div>
    </div>
  );
}

export default QuizzesIntroDashboard;
