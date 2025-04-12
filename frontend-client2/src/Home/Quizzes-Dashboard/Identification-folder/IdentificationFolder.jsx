import React, { useState } from "react";
import "./Identificationfolder.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/sidebar/Sidebar";
import Identifications from "../../../Components/Quizzes-pages/identification/Identification";

function IdentificationFolder() {
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
        <Identifications />
      </div>
    </div>
  );
}

export default IdentificationFolder;
