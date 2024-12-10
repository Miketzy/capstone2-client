import React, { useState } from "react";
import "./QuizzesDashboard.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Quizzes from "../../../Components/Quizzes-pages/Quizzes-Folder/Quizzes";
import Sidebar from "../../../Components/sidebar/Sidebar";

function QuizzesDashboard() {
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
        <Quizzes />
      </div>
    </div>
  );
}

export default QuizzesDashboard;
