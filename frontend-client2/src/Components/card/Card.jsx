import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      {/* Header Section */}
      <header className="text-center p-8 bg-green-700 rounded-lg shadow-lg mb-6 mt-20">
        <h1 className="text-5xl font-bold text-white">
          Welcome to BioExplorer
        </h1>
        <p className="mt-2 text-gray-200">
          Explore the fascinating world of biodiversity, discover species, their
          habitats, and ecosystems. Dive into our interactive map, comprehensive
          database, engaging quizzes, and insightful analytics. Begin your
          journey to understanding the species that share our planet!
        </p>
      </header>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <Link to="/mapping" className="card-link">
          <div className="bg-green-600 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn hover:bg-green-500">
            <div className="bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="mb-4">
                <img
                  className="map-icon"
                  src="/picture/9039.png_1200-removebg-preview.png"
                  alt="Map Icon"
                  width={150}
                  height={100}
                />
              </div>
              <h1 className="text-lg font-bold text-green-700">MAP</h1>
            </div>
          </div>
        </Link>

        <Link to="/database" className="card-link">
          <div className="bg-green-600 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn hover:bg-green-500">
            <div className="bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="mb-4">
                <img
                  className="database-icon"
                  src="/picture/m-0976-3d-icon.png"
                  alt="Database Icon"
                  width={150}
                  height={100}
                />
              </div>
              <h1 className="text-lg font-bold text-green-700">DATABASE</h1>
            </div>
          </div>
        </Link>

        <Link to="/cardquizzes" className="card-link">
          <div className="bg-green-600 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn hover:bg-green-500">
            <div className="bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="mb-4">
                <img
                  className="quizzes-icon"
                  src="/picture/png-transparent-quiz-exam-test-question-answer-faq-3d-icon-removebg-preview.png"
                  alt="Quizzes Icon"
                  width={100}
                  height={80}
                />
              </div>
              <h1 className="text-lg font-bold text-green-700">QUIZZES</h1>
            </div>
          </div>
        </Link>

        <Link to="/analytics" className="card-link">
          <div className="bg-green-600 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn hover:bg-green-500">
            <div className="bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="mb-4">
                <img
                  src="/picture/3273372.webp"
                  alt="Analytics Icon"
                  width={100}
                />
              </div>
              <h1 className="text-lg font-bold text-green-700">Analytics</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
