import React from "react";
import FrontpageNavbar from "../../Components/frontpage/Front-page/FrontpageNavbar";
import AboutTheProject from "../../Components/frontpage/About-the-Project/AboutTheProject";

const AboutPages = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <FrontpageNavbar />

      <main className="flex-grow">
        <AboutTheProject />
      </main>
    </div>
  );
};

export default AboutPages;
