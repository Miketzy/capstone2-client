import React from "react";
import FrontpageNavbar from "../../src/Components/frontpage/Front-page/FrontpageNavbar";
import FrontpageHome from "../../src/Components/frontpage/FrontpageHome/FrontpageHome";

const FrontPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is persistent across all pages */}
      <FrontpageNavbar />

      {/* Main content changes based on routes */}
      <main className="flex-grow">
        <FrontpageHome />
      </main>
    </div>
  );
};

export default FrontPage;
