import React, { useState } from "react";
import "./CardQuizFolder.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/sidebar/Sidebar";
import CardQuiz from "../../../Components/Quizzes-pages/cardquiz/CardQuiz";

function CardQuizFolder() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="databasehome">
      <div className="quizes-navbarTop">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="quizessidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>

      <div className="quizes-content">
        <CardQuiz />
      </div>
    </div>
  );
}

export default CardQuizFolder;
