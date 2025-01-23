import React from "react";
import FrontpageNavbar from "../../Components/frontpage/Front-page/FrontpageNavbar";
import TeamPage from "../../Components/frontpage/team-pages/TeamPage";

const TeamHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is persistent across all pages */}
      <FrontpageNavbar />

      {/* Main content changes based on routes */}
      <main className="flex-grow">
        <TeamPage />
      </main>
    </div>
  );
};

export default TeamHome;
