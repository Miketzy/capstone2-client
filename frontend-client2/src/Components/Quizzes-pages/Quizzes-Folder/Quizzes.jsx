import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/random-questions"
      );
      setQuestions(response.data);
      setUserAnswers(Array(response.data.length).fill(null)); // Initialize answers array
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;
    setUserAnswers(updatedAnswers);

    // If answer is correct, increment score
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const saveScore = async (finalScore) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8081/api/save-score",
        { score: finalScore }, // Send the exact score
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  useEffect(() => {
    if (showScore) {
      saveScore(score); // Save the score exactly as it is when quiz ends
    }
  }, [showScore, score]); // This ensures the final score is passed correctly

  const handleBack = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
    fetchQuestions(); // Re-fetch questions when restarting the quiz
  };

  return (
    <div className="wrapperquiz">
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
            <br />
            <button onClick={handleRestart}>Restart Quiz</button>
          </div>
        ) : (
          questions.length > 0 && (
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>

              <div className="answer-section">
                <button
                  className="optionB"
                  onClick={() =>
                    handleAnswerClick(questions[currentQuestion].optionA)
                  }
                >
                  {questions[currentQuestion].optionA}
                </button>
                <button
                  className="optionB"
                  onClick={() =>
                    handleAnswerClick(questions[currentQuestion].optionB)
                  }
                >
                  {questions[currentQuestion].optionB}
                </button>
                <button
                  className="optionB"
                  onClick={() =>
                    handleAnswerClick(questions[currentQuestion].optionC)
                  }
                >
                  {questions[currentQuestion].optionC}
                </button>
                <button
                  className="optionB"
                  onClick={() =>
                    handleAnswerClick(questions[currentQuestion].optionD)
                  }
                >
                  {questions[currentQuestion].optionD}
                </button>
              </div>
              <br />
              {currentQuestion > 0 && (
                <button className="quizB" onClick={handleBack}>
                  Back
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Quizzes;
