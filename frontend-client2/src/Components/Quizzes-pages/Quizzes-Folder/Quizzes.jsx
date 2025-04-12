import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../../Config";

function Quizzes() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionGroupIndex, setCurrentQuestionGroupIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [lastScore, setLastScore] = useState(null);

  const questionsPerPage = 5;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/multiple-choice`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Failed to fetch questions", err));

    // Get last score from localStorage if exists
    const savedScore = localStorage.getItem("lastQuizScore");
    if (savedScore !== null) {
      setLastScore(savedScore);
    }
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNext = () => {
    if (
      currentQuestionGroupIndex * questionsPerPage + questionsPerPage <
      questions.length
    ) {
      setCurrentQuestionGroupIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;

    // Calculate the score
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        finalScore++;
      }
    });

    // Retrieve firstname and lastname from localStorage
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");

    if (!firstname || !lastname) {
      console.error("User details (firstname/lastname) are missing");
      return;
    }

    // Submit the score to the backend
    axios
      .post(`${API_URL}/api/submit-score`, {
        firstname,
        lastname,
        score: finalScore,
      })
      .then((response) => {
        console.log("Score submitted:", response.data);
        setScore(finalScore);
        setSubmitted(true);
        setShowScore(true);
        localStorage.setItem("lastQuizScore", finalScore); // Save score
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
      });
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setSubmitted(false);
    setCurrentQuestionGroupIndex(0);
    setUserAnswers({});
    setScore(0);
    setShowAnswers(false);
    setShowScore(false);
    setShowAllAnswers(false);
  };

  const handleSeeAnswers = () => {
    setShowAllAnswers(true);
  };

  const currentQuestions = questions.slice(
    currentQuestionGroupIndex * questionsPerPage,
    (currentQuestionGroupIndex + 1) * questionsPerPage
  );

  const isLastGroup =
    currentQuestionGroupIndex * questionsPerPage >=
    questions.length - questionsPerPage;

  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full mb-[180px]">
        {!quizStarted ? (
          <>
            <h1 className="text-3xl font-bold text-green-700 mb-4">
              🧬 Multiple Choice Quiz
            </h1>
            {/* Display greeting and last score */}
            <p className="text-gray-600">
              Welcome,{" "}
              <span className="font-semibold">
                {firstname} {lastname}
              </span>
              !
            </p>
            {lastScore !== null && (
              <p className="text-green-700 font-medium text-lg">
                🏆 Last Score: {lastScore} / {questions.length}
              </p>
            )}
            <p className="text-lg mb-2">
              Test your species knowledge. Click "Get Started" to begin.
            </p>
            {lastScore !== null && (
              <p className="text-md mb-4 text-gray-600">
                Your last score:{" "}
                <span className="font-semibold text-green-700">
                  {lastScore} / {questions.length}
                </span>
              </p>
            )}
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-green-600 text-white py-2 px-6 rounded-lg"
            >
              Get Started
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              Questions {currentQuestionGroupIndex * questionsPerPage + 1} -{" "}
              {Math.min(
                (currentQuestionGroupIndex + 1) * questionsPerPage,
                questions.length
              )}{" "}
              of {questions.length}
            </h2>
            {currentQuestions.map((q) => (
              <div key={q.id} className="mb-6 text-left">
                <p className="font-medium">{q.question}</p>
                {q.options.map((opt, idx) => (
                  <label key={idx} className="block ml-4">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={userAnswers[q.id] === opt}
                      onChange={() => handleOptionChange(q.id, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}
            <div className="mt-4">
              {isLastGroup ? (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quizzes;
