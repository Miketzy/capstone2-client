import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../../Config"; // Make sure your path is correct

// Shuffle function (Fisher-Yates algorithm)
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [lastScore, setLastScore] = useState(0);

  const questionsPerPage = 5;

  useEffect(() => {
    const fetchIdentificationInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(`${API_URL}/api/identificationinfo`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(response.data);
        setLastScore(response.data.score || 0);
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response?.data || error.message
        );
      }
    };

    fetchIdentificationInfo();
  }, []);

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
    const allAnswered = currentQuestions.every(
      (_, i) => userAnswers[start + i]?.trim() !== ""
    );

    if (!allAnswered) {
      alert("Please answer all questions before continuing.");
      return;
    }

    if (end >= randomizedQuestions.length) {
      let calculatedScore = 0;
      randomizedQuestions.forEach((q, i) => {
        if (
          userAnswers[i]?.trim().toLowerCase() === q.correctAnswer.toLowerCase()
        ) {
          calculatedScore += 1;
        }
      });

      setScore(calculatedScore);
      setShowScore(true);

      const firstName = localStorage.getItem("firstname") || "";
      const lastName = localStorage.getItem("lastname") || "";

      if (!firstName || !lastName) {
        alert(
          "Missing first name or last name. Please log in or register first."
        );
        return;
      }

      const payload = {
        firstname: firstName,
        lastname: lastName,
        score: calculatedScore,
      };

      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `${API_URL}/api/submit-quiz`,
          payload
        );
        console.log("Quiz results submitted successfully!", response.data);
        alert("Quiz results submitted successfully!");
      } catch (error) {
        console.error("Error submitting quiz results:", error);
        alert(
          error.response?.data?.message ||
            "There was an error submitting your quiz. Please try again later."
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentPage(currentPage + 1);
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
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-200">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🧬 Loading Quiz...
          </h1>
          <p className="text-lg text-gray-800 mb-6">
            Please wait while we load the quiz questions.
          </p>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-200">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full mb-[180px]">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🧬 Identification Quiz
          </h1>
          <p className="text-gray-600">
            Welcome,{" "}
            <span className="font-semibold">{user?.firstname || "User"}</span>
          </p>
          <p className="text-green-700 font-medium text-lg">
            🏆 Last Score: {lastScore !== 0 ? lastScore : "No score yet"}
          </p>
          <p className="text-lg text-gray-800 mb-6">
            Test your knowledge of species and their scientific names. Click
            "Get Started" to begin.
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
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-200">
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
      <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-green-200">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            📚 All Correct Answers
          </h2>
          {randomizedQuestions.map((q, index) => {
            const userAnswer = userAnswers[index]?.trim() || "";
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
                    className={isCorrect ? "text-green-700" : "text-red-700"}
                  >
                    {userAnswer || "No answer"}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Correct Answer: </span>
                  <span className="text-green-700">{correctAnswer}</span>
                </p>
              </div>
            );
          })}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleBackToIntro}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              Back to Intro
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          📚 Identification Quiz
        </h2>
        {currentQuestions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <p className="font-semibold text-gray-800">
              {start + index + 1}. {q.question}
            </p>
            <input
              type="text"
              className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={userAnswers[start + index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Your answer"
            />
          </div>
        ))}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNextOrSubmit}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition"
          >
            {end >= randomizedQuestions.length ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Identifications;
