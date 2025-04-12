import React, { useState, useEffect } from "react";

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
  const questions = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    question: `What is the scientific name of species?`, // Number is now before the question
    correctAnswer: `Answer${i + 1}`, // Example correct answers
  }));

  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(25).fill(""));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // Flag to control intro screen
  const [randomizedQuestions, setRandomizedQuestions] = useState([]); // Store randomized questions

  const questionsPerPage = 5;

  useEffect(() => {
    if (quizStarted) {
      // Shuffle the questions when quiz starts or restarts
      setRandomizedQuestions(shuffleArray(questions));
    }
  }, [quizStarted]);

  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;
  const currentQuestions = randomizedQuestions.slice(start, end);

  const handleChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[start + index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleNextOrSubmit = () => {
    const allAnswered = currentQuestions.every(
      (_, i) => userAnswers[start + i].trim() !== ""
    );
    if (!allAnswered) {
      alert("Please answer all questions before continuing.");
      return;
    }

    if (end >= randomizedQuestions.length) {
      let calculatedScore = 0;
      randomizedQuestions.forEach((q, i) => {
        if (
          userAnswers[i].trim().toLowerCase() === q.correctAnswer.toLowerCase()
        ) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);
      setShowScore(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackToIntro = () => {
    setQuizStarted(false); // Go back to the intro screen
    setCurrentPage(0); // Reset the page to 0
    setUserAnswers(Array(25).fill("")); // Reset answers
    setShowScore(false); // Hide score
    setScore(0); // Reset score
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen  from-green-50 to-green-200 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full  mb-[180px]">
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
      <div className="min-h-screen  from-green-50 to-green-200 flex items-center justify-center p-6">
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
    <div className="min-h-screen  from-green-50 to-green-200 p-6 flex items-center justify-center">
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
            <p className="font-semibold text-green-800 mb-2">
              {start + index + 1}. {q.question}
            </p>
            <input
              type="text"
              placeholder="Enter your answer..."
              value={userAnswers[start + index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full p-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}

        <button
          onClick={handleNextOrSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {end >= randomizedQuestions.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Identifications;
