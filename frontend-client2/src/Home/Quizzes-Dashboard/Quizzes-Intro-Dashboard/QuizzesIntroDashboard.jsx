import React, { useState } from "react";
import "./QuizzesIntroDashbord.css";

import QuizzesIntro from "../../../Components/Quizzes-pages/Quizes-Intro-folder/QuizzesIntro";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/sidebar/Sidebar";

function QuizzesIntroDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="databasehome">
      <div className="quizesIntro-navbarTop">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="quizesIntro-sidebar">
        <Sidebar isSidebarVisible={isSidebarVisible} />
      </div>
      <div className="quizesIntro-content">
        <QuizzesIntro />
      </div>
    </div>
  );
}

export default QuizzesIntroDashboard;
