import React from "react";
import { Link } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";

function CardQuiz() {
  const quizzes = [
    {
      type: "Multiple Choice",
      icon: <FaListAlt className="text-green-700 text-4xl" />,
      description:
        "Choose the best answer from the options related to species and biodiversity.",
      bgColor: "bg-green-100",
      url: "/quizzes",
    },
    {
      type: "Identification",
      icon: <MdQuiz className="text-blue-700 text-4xl" />,
      description:
        "Identify the scientific or common names of species based on clues or images.",
      bgColor: "bg-blue-100",
      url: "/cardquizzes/identification",
    },
    {
      type: "Matching Type",
      icon: <RiExchangeFundsLine className="text-yellow-700 text-4xl" />,
      description:
        "Match species to their classification, habitat, or characteristics.",
      bgColor: "bg-yellow-100",
      url: "/cardquizzes/matchingtype",
    },
  ];

  return (
    <div className="min-h-screen  from-green-50 to-green-200 p-10">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        BioExplorer Quiz Types
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {quizzes.map((quiz, index) => (
          <Link to={quiz.url} key={index}>
            <div
              className={`rounded-2xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-xl ${quiz.bgColor} cursor-pointer`}
            >
              <div className="flex items-center justify-center mb-4">
                {quiz.icon}
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {quiz.type}
              </h2>
              <p className="text-gray-700 text-center">{quiz.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardQuiz;
