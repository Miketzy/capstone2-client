import React, { useState } from "react";

function Quizzes() {
  const questions = [
    {
      id: 1,
      question: "What is the scientific name of the Eastern Bluebird?",
      options: [
        "Sialia sialis",
        "Turdus migratorius",
        "Erythrura gouldiae",
        "Passer domesticus",
      ],
      correctAnswer: "Sialia sialis",
    },
    {
      id: 2,
      question:
        "Which of the following species is known as the 'King of the Jungle'?",
      options: ["Tiger", "Lion", "Leopard", "Jaguar"],
      correctAnswer: "Lion",
    },
    {
      id: 3,
      question: "What is the primary habitat of the Polar Bear?",
      options: ["Desert", "Tropical Forest", "Arctic", "Mountain"],
      correctAnswer: "Arctic",
    },
    {
      id: 4,
      question: "Which of the following is the largest living land mammal?",
      options: ["Elephant", "Rhino", "Giraffe", "Hippopotamus"],
      correctAnswer: "Elephant",
    },
    {
      id: 5,
      question:
        "Which bird is known for its elaborate tail feathers used in mating displays?",
      options: ["Peacock", "Swan", "Eagle", "Pigeon"],
      correctAnswer: "Peacock",
    },
    {
      id: 6,
      question: "Which animal is known for its black and white stripes?",
      options: ["Zebra", "Tiger", "Panda", "Cheetah"],
      correctAnswer: "Zebra",
    },
    {
      id: 7,
      question: "What is the largest species of shark?",
      options: [
        "Great White Shark",
        "Whale Shark",
        "Hammerhead Shark",
        "Bull Shark",
      ],
      correctAnswer: "Whale Shark",
    },
    {
      id: 8,
      question: "What is the tallest animal on Earth?",
      options: ["Elephant", "Giraffe", "Kangaroo", "Camel"],
      correctAnswer: "Giraffe",
    },
    {
      id: 9,
      question: "Which animal is known for its ability to change colors?",
      options: ["Chameleon", "Octopus", "Cuttlefish", "Squid"],
      correctAnswer: "Chameleon",
    },
    {
      id: 10,
      question: "Which animal is considered the fastest on land?",
      options: ["Lion", "Cheetah", "Leopard", "Gazelle"],
      correctAnswer: "Cheetah",
    },
    {
      id: 11,
      question: "What is the largest living bird?",
      options: ["Penguin", "Eagle", "Ostrich", "Albatross"],
      correctAnswer: "Ostrich",
    },
    {
      id: 12,
      question: "Which animal is the largest predator on land?",
      options: ["Grizzly Bear", "Polar Bear", "Lion", "Tiger"],
      correctAnswer: "Polar Bear",
    },
    {
      id: 13,
      question: "What species of whale is known for its long migration?",
      options: ["Blue Whale", "Humpback Whale", "Orca", "Narwhal"],
      correctAnswer: "Humpback Whale",
    },
    {
      id: 14,
      question: "Which bird is known for its large nest and strong beak?",
      options: ["Eagle", "Sparrow", "Penguin", "Falcon"],
      correctAnswer: "Eagle",
    },
    {
      id: 15,
      question: "Which mammal is capable of flight?",
      options: ["Bat", "Bird", "Flying Squirrel", "Flying Fox"],
      correctAnswer: "Bat",
    },
    {
      id: 16,
      question: "Which reptile has the longest lifespan?",
      options: ["Tortoise", "Crocodile", "Iguana", "Snake"],
      correctAnswer: "Tortoise",
    },
    {
      id: 17,
      question: "Which species is known as the 'king of the sky'?",
      options: ["Eagle", "Hawk", "Owl", "Vulture"],
      correctAnswer: "Eagle",
    },
    {
      id: 18,
      question: "What animal is capable of regenerating its limbs?",
      options: ["Starfish", "Axolotl", "Lizard", "Frog"],
      correctAnswer: "Axolotl",
    },
    {
      id: 19,
      question: "Which species is known for living in colonies with a queen?",
      options: ["Ant", "Bee", "Termite", "Spider"],
      correctAnswer: "Ant",
    },
    {
      id: 20,
      question: "What is the fastest marine animal?",
      options: ["Sailfish", "Shark", "Dolphin", "Tuna"],
      correctAnswer: "Sailfish",
    },
    {
      id: 21,
      question: "Which animal is capable of seeing in color?",
      options: ["Dogs", "Cats", "Birds", "Humans"],
      correctAnswer: "Birds",
    },
    {
      id: 22,
      question: "Which animal has the largest eyes?",
      options: ["Elephant", "Owl", "Squid", "Giraffe"],
      correctAnswer: "Squid",
    },
    {
      id: 23,
      question: "Which animal has the strongest bite force?",
      options: ["Alligator", "Crocodile", "Shark", "Lion"],
      correctAnswer: "Crocodile",
    },
    {
      id: 24,
      question: "What species is known for its ability to fly backwards?",
      options: ["Hummingbird", "Swallow", "Bat", "Dragonfly"],
      correctAnswer: "Hummingbird",
    },
    {
      id: 25,
      question: "Which species is the largest living mammal?",
      options: ["Blue Whale", "Elephant", "Giraffe", "Shark"],
      correctAnswer: "Blue Whale",
    },
  ];

  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionGroupIndex, setCurrentQuestionGroupIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const questionsPerPage = 5; // Show 5 questions per page

  // Handle the change in the selected option
  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (
      currentQuestionGroupIndex * questionsPerPage + questionsPerPage <
      questions.length
    ) {
      setCurrentQuestionGroupIndex((prevIndex) => prevIndex + 1); // Move to the next set of questions
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        finalScore += 1;
      }
    });

    setScore(finalScore);
    setSubmitted(true);
    setShowScore(true); // Show score after submission
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

  const isLastQuestionGroup =
    currentQuestionGroupIndex * questionsPerPage >=
    questions.length - questionsPerPage;

  // Conditional rendering based on showScore and showAllAnswers
  if (showScore && !showAllAnswers) {
    return (
      <div className="min-h-screen from-green-50 to-green-200 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🎉 Quiz Completed!
          </h1>
          <p className="text-lg text-gray-800 mb-2">You scored:</p>
          <p className="text-4xl font-bold text-green-600 mb-6">
            {score} / {questions.length}
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleSeeAnswers}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              📖 See All Correct Answers
            </button>
            <button
              onClick={handleRestart}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-medium transition"
            >
              🔁 Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If 'See All Correct Answers' is clicked, show the answers
  if (showAllAnswers) {
    return (
      <div className="min-h-screen  from-green-50 to-green-200 p-6">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            📚 All Correct Answers
          </h2>
          {questions.map((q, index) => {
            const userAnswer = userAnswers[q.id]?.trim() || "";
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
              onClick={handleRestart}
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
    <div className="min-h-screen from-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full mb-[180px]">
        {!quizStarted ? (
          <>
            <h1 className="text-3xl font-bold text-green-700 mb-4">
              🧬 Multiple Choice Quiz
            </h1>
            <p className="text-lg text-gray-800 mb-6">
              Welcome to the Multiple Choice Quiz! Test your knowledge of
              species and their scientific names. Click "Get Started" to begin.
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-green-600 text-white py-2 px-6 rounded-lg"
            >
              Get Started
            </button>
          </>
        ) : (
          <div>
            {submitted ? (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Your Score: {score}/25
                </h2>
                <button
                  onClick={handleRestart}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg mr-4"
                >
                  Restart Quiz
                </button>
                <button
                  onClick={handleSeeAnswers}
                  className="bg-gray-600 text-white py-2 px-6 rounded-lg"
                >
                  See Answers
                </button>
              </div>
            ) : (
              <div>
                {currentQuestions ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">
                      Questions{" "}
                      {currentQuestionGroupIndex * questionsPerPage + 1} -
                      {Math.min(
                        (currentQuestionGroupIndex + 1) * questionsPerPage,
                        questions.length
                      )}{" "}
                      of {questions.length}
                    </h2>
                    {currentQuestions.map((question) => (
                      <div key={question.id}>
                        <p className="text-lg mb-4">{question.question}</p>
                        {question.options.map((option, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={userAnswers[question.id] === option}
                              onChange={() =>
                                handleOptionChange(question.id, option)
                              }
                              className="h-5 w-5 text-green-600 border-gray-300"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                    <div className="mt-4">
                      {isLastQuestionGroup ? (
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
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quizzes;
