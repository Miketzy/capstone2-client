import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import API_URL from "../../../Config"; // Make sure your API_URL is correct

// Fisher-Yates Shuffle function to randomize questions
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function Identifications() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const questionsPerPage = 5;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/identification_question`
        );
        if (Array.isArray(response.data)) {
          const formattedQuestions = response.data.map((item) => ({
            id: item.id,
            question: item.statement,
            correctAnswer: item.answer,
          }));
          setQuestions(formattedQuestions.slice(0, 25));
          setUserAnswers(Array(25).fill(""));
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (quizStarted && !loading) {
      setRandomizedQuestions(shuffleArray(questions));
    }
  }, [quizStarted, questions, loading]);

  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;
  const currentQuestions = randomizedQuestions.slice(start, end);

  const handleChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[start + index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleNextOrSubmit = async () => {
    let correct = 0;

    // Ensure we are comparing user answers with correct answers
    randomizedQuestions.forEach((item, index) => {
      const userAnswer = userAnswers[index].trim().toLowerCase();
      const correctAnswer = item.correctAnswer.trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        correct += 1;
      }
    });

    setScore(correct);
    setShowScore(true);

    // Get user info from localStorage
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");

    try {
      await axios.post(`${API_URL}/api/identification-submit-score`, {
        firstname,
        lastname,
        score: correct,
      });

      console.log("Score submitted successfully!");

      // Store the score in localStorage for the current user
      localStorage.setItem("user_score", correct);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const handleBackToIntro = () => {
    setQuizStarted(false);
    setCurrentPage(0);
    setUserAnswers(Array(25).fill(""));
    setShowScore(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen from-green-50 to-green-200 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🧬 Loading Quiz...
          </h1>
          <p className="text-lg text-gray-800 mb-6">
            Please wait while we load the quiz questions.
          </p>
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen from-green-50 to-green-200 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full mb-[180px]">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🧬 Identification Quiz
          </h1>
          <p className="text-lg text-gray-800 mb-6">
            Welcome to the Identification Quiz! Test your knowledge of species
            and their scientific names. Click "Get Started" to begin.
          </p>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  if (showScore && !showAllAnswers) {
    return (
      <div className="min-h-screen from-green-50 to-green-200 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🎉 Quiz Completed!
          </h1>
          <p className="text-lg text-gray-800 mb-2">You scored:</p>
          <p className="text-4xl font-bold text-green-600 mb-6">
            {score} / {randomizedQuestions.length}
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowAllAnswers(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              📖 See All Correct Answers
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              🔁 Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showAllAnswers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            📚 All Correct Answers
          </h2>
          {randomizedQuestions.map((q, index) => {
            const userAnswer = userAnswers[index].trim();
            const correctAnswer = q.correctAnswer.trim();
            const isCorrect =
              userAnswer.toLowerCase() === correctAnswer.toLowerCase();

            return (
              <div
                key={q.id}
                className={`p-4 rounded-lg mb-4 border-2 ${
                  isCorrect
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                }`}
              >
                <p className="font-semibold text-gray-800 mb-2">
                  {index + 1}. {q.question}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Your Answer: </span>
                  <span
                    className={`${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {userAnswer || "No answer"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm">
                    <span className="font-medium">Correct Answer: </span>
                    <span className="text-green-800">{correctAnswer}</span>
                  </p>
                )}
              </div>
            );
          })}
          <div className="text-center mt-6">
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              🔁 Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen from-green-50 to-green-200 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🧬 Identification Quiz
        </h1>

        <button
          onClick={handleBackToIntro}
          className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium mb-4 transition"
        >
          Back to Intro
        </button>

        {currentQuestions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <p className="text-lg font-medium text-gray-800 mb-2">
              {start + index + 1}. {q.question}
            </p>
            <input
              type="text"
              value={userAnswers[start + index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              placeholder="Your answer"
            />
          </div>
        ))}

        <div className="flex justify-between">
          <button
            onClick={handleNextOrSubmit}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition"
          >
            {end >= randomizedQuestions.length ? "Submit Quiz" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Identifications;
