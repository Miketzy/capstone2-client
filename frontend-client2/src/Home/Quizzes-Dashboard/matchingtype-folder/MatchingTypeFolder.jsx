import React, { useState } from "react";
import "./MatchingType.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/sidebar/Sidebar";

import MatchingTypes from "../../../Components/Quizzes-pages/matching-type/MatchingTypes";

function MatchingTypeFolder() {
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
        <MatchingTypes />
      </div>
    </div>
  );
}

export default MatchingTypeFolder;
