import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      {/* Header Section */}
      <header className="website-header text-center p-6 bg-blue-200 rounded-lg shadow-md mb-6">
        <p className="mt-2 text-gray-700">
          Explore the world of biodiversity through our interactive map,
          detailed database, engaging quizzes, and insightful analytics. This
          platform is designed to make learning about species and their habitats
          easy and enjoyable. Start your journey now!
        </p>
      </header>

      {/* Card Section */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <Link to="/mapping" className="card-link">
          <div className="cardbox bg-blue-700 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn glow-animation">
            <div className="inner-box bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="card-icon mb-4">
                <img
                  className="map-icon"
                  src="/picture/9039.png_1200-removebg-preview.png"
                  alt="Map Icon"
                  width={150}
                  height={100}
                />
              </div>
              <h1 className="map-txt text-lg font-bold text-gray-800">MAP</h1>
            </div>
          </div>
        </Link>

        <Link to="/database" className="card-link">
          <div className="cardbox bg-blue-700 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn glow-animation">
            <div className="inner-box bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="card-icon mb-4">
                <img
                  className="database-icon"
                  src="/picture/m-0976-3d-icon.png"
                  alt="Database Icon"
                  width={150}
                  height={100}
                />
              </div>
              <h1 className="database-text text-lg font-bold text-gray-800">
                DATABASE
              </h1>
            </div>
          </div>
        </Link>

        <Link to="/quizzes-intro" className="card-link">
          <div className="cardbox bg-blue-700 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn glow-animation">
            <div className="inner-box bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="card-icon mb-4">
                <img
                  className="quizes-icon"
                  src="/picture/png-transparent-quiz-exam-test-question-answer-faq-3d-icon-removebg-preview.png"
                  alt="Quizzes Icon"
                  width={100}
                  height={80}
                />
              </div>
              <h1 className="card-quizes text-lg font-bold text-gray-800">
                QUIZZES
              </h1>
            </div>
          </div>
        </Link>

        <Link to="/analytics" className="card-link">
          <div className="cardbox bg-blue-700 shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform duration-300 flex flex-col items-center justify-center hover:scale-105 h-[210px] animate-fadeIn glow-animation">
            <div className="inner-box bg-white w-full h-full p-4 rounded-lg flex flex-col items-center justify-center">
              <div className="card-icon mb-4">
                <img
                  src="/picture/3273372.webp"
                  alt="Analytics Icon"
                  width={100}
                />
              </div>
              <h1 className="text-lg font-bold text-gray-800">Analytics</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card;
