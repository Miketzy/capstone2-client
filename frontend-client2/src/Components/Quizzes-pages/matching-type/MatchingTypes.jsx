import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../../Config";

function MatchingTypes() {
  const [started, setStarted] = useState(false);
  const [matches, setMatches] = useState({});
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [matchingData, setMatchingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const questionsPerPage = 5;
  const totalPages = Math.ceil(matchingData.length / questionsPerPage);

  useEffect(() => {
    const fetchMatchingQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/matching_type_question`
        );
        setMatchingData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matching questions:", error);
        setLoading(false);
      }
    };

    fetchMatchingQuestions();
  }, []);

  useEffect(() => {
    // Get the stored score from localStorage (if any) when the component loads
    const storedScore = localStorage.getItem("user_score");
    if (storedScore) {
      setScore(Number(storedScore));
    }
  }, []);

  const handleStart = () => {
    const shuffled = [...matchingData.map((item) => item.item_b)].sort(
      () => Math.random() - 0.5
    );
    setShuffledAnswers(shuffled);
    setStarted(true);
  };

  const handleSelect = (id, selected) => {
    setMatches((prev) => {
      const updatedMatches = { ...prev, [id]: selected };
      calculateScore(updatedMatches);
      return updatedMatches;
    });
  };

  const calculateScore = (matches) => {
    let correct = 0;
    matchingData.forEach((item) => {
      if (matches[item.id] === item.item_b) {
        correct += 1;
      }
    });
    setScore(correct);
  };

  const currentQuestions = matchingData.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handleSubmit = async () => {
    let correct = 0;
    matchingData.forEach((item) => {
      if (matches[item.id] === item.item_b) {
        correct += 1;
      }
    });
    setScore(correct);
    setShowResult(true);

    // Get user info from localStorage
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");

    try {
      await axios.post(`${API_URL}/api/matching-submit-score`, {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-green-700 font-semibold">
          Loading questions...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-center justify-center p-6">
      {!started ? (
        <div className="text-center space-y-6 max-w-xl bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-green-700">
            🌿 BiExplorer Matching Quiz
          </h1>
          <p className="text-gray-600">
            Welcome,{" "}
            <span className="font-semibold">
              {user?.firstname && user?.lastname
                ? `${user.firstname} ${user.lastname}`
                : "User"}{" "}
            </span>
          </p>
          {lastScore !== null && (
            <p className="text-green-700 font-medium text-lg">
              🏆 Last Score: {lastScore !== null ? lastScore : "No score yet"} /{" "}
              {questions.length}
            </p>
          )}
          <p className="text-gray-600">
            Match the common name (Column A) to its scientific name (Column B).
            Ready to explore?
          </p>
          {score > 0 && (
            <p className="text-xl text-green-600">You scored {score} so far.</p>
          )}
          <button
            onClick={handleStart}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Get Started
          </button>
        </div>
      ) : showResult ? (
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🎉 Quiz Completed!
          </h1>
          <p className="text-lg text-gray-800 mb-2">You scored:</p>
          <p className="text-4xl font-bold text-green-600 mb-6">
            {score} / {matchingData.length}
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

          {showAllAnswers && (
            <div className="mt-6 text-left max-h-64 overflow-y-auto">
              <h2 className="text-xl font-semibold text-green-600 mb-2">
                Correct Answers:
              </h2>
              <ul className="space-y-2">
                {matchingData.map((item) => (
                  <li key={item.id} className="text-sm">
                    ✅ <strong>{item.item_a}</strong> — <em>{item.item_b}</em>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Match the Species
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Column A */}
            <div>
              <h3 className="font-semibold text-green-600 mb-2">
                Column A (Common Name)
              </h3>
              {currentQuestions.map((item) => (
                <div key={item.id} className="mb-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    {item.item_a}
                  </div>
                </div>
              ))}
            </div>

            {/* Column B */}
            <div>
              <h3 className="font-semibold text-green-600 mb-2">
                Column B (Scientific Name)
              </h3>
              {currentQuestions.map((item) => (
                <div key={item.id} className="mb-3">
                  <select
                    onChange={(e) => handleSelect(item.id, e.target.value)}
                    className="w-full p-2 border border-green-300 rounded-md"
                    value={matches[item.id] || ""}
                  >
                    <option value="">Select answer</option>
                    {shuffledAnswers.map((ans, index) => (
                      <option key={index} value={ans}>
                        {ans}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination / Submit */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
              >
                ✅ Submit
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchingTypes;
