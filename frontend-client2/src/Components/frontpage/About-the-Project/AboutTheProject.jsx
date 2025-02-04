import React from "react";

const AboutTheProject = () => {
  return (
    <div className="py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-emerald-800 bg-emerald-200 py-3 px-8 rounded-md shadow-md inline-block">
          About the Project
        </h2>
        <p className="mt-6 text-xl text-gray-800 max-w-3xl mx-auto text-justify bg-green-50 py-6 px-4 rounded-lg shadow-md">
          BioExplorer is an innovative species categorization and exploration
          system designed to document and analyze biodiversity from ridges to
          reefs. It serves as a centralized platform for researchers, educators,
          and nature enthusiasts to access and contribute species data, making
          biodiversity research more interactive and insightful.
        </p>

        <div className="mt-14 space-y-10">
          <div className="space-y-6 bg-emerald-100 py-6 px-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-emerald-700 bg-emerald-300 py-2 px-6 rounded-md shadow-lg inline-block">
              Project Goals:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4 max-w-2xl mx-auto text-justify">
              <li>
                To create a structured and user-friendly species database.
              </li>
              <li>
                To promote biodiversity awareness and conservation through
                digital tools
              </li>
              <li>To provide a mapping system for species distribution</li>
              <li>
                To engage users through interactive quizzes and analytics.
              </li>
              <li>
                To support contributors in adding and managing species data
                efficiently.
              </li>
            </ul>
          </div>

          <div className="space-y-6 bg-emerald-100 py-6 px-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-emerald-700 bg-emerald-300 py-2 px-6 rounded-md shadow-lg inline-block">
              How It Works:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4 max-w-2xl mx-auto text-justify">
              <li className="list-none">
                BioExplorer allows users to explore species information through
                an interactive database categorized from ridges to reefs.
                Contributors can add and verify species data, while an admin
                panel ensures quality control. The system includes a mapping
                tool to visualize species distribution and a quiz feature for
                learning reinforcement. Analytics provide insights into species
                trends and user engagement
              </li>
            </ul>
          </div>

          <div className="space-y-6 bg-emerald-100 py-6 px-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-emerald-700 bg-emerald-300 py-2 px-6 rounded-md shadow-lg inline-block">
              Why It Matters:
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-justify">
              Biodiversity is crucial for ecosystem balance, but species data is
              often scattered and inaccessible. BioExplorer centralizes this
              information, making it easier for researchers and enthusiasts to
              study and contribute to conservation efforts. By bridging
              technology and environmental awareness, BioExplorer supports
              sustainable biodiversity management.
            </p>
          </div>

          <div className="mt-10 space-y-6 bg-emerald-100 py-6 px-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-emerald-700 bg-emerald-300 py-2 px-6 rounded-md shadow-lg inline-block">
              Features:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4 max-w-2xl mx-auto text-justify">
              <li>
                <strong>Species Database:</strong> Browse categorized species
                information from ridges to reefs.
              </li>
              <li>
                <strong>Mapping System:</strong> Visualize species locations on
                an interactive map.
              </li>
              <li>
                <strong>Quizzes:</strong> Test your biodiversity knowledge
                through engaging quizzes.
              </li>
              <li>
                <strong>Analytics Dashboard:</strong> Gain insights into species
                data and user interactions
              </li>
              <li>
                <strong>Contributor Panel:</strong> Allow verified users to
                submit and manage species information
              </li>
              <li>
                <strong>Admin Controls:</strong> Oversee data quality, user
                contributions, and system settings.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheProject;
