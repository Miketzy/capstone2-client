import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(""); // To store answer status (correct/incorrect)

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://capstone2-client.onrender.com/api/random-questions"
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

    // Check if the selected answer is correct and update score
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("Correct");
    } else {
      setAnswerStatus(
        `Incorrect. The correct answer is: ${questions[currentQuestion].correctAnswer}`
      );
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
        "https://capstone2-client.onrender.com/api/save-score",
        { score: finalScore },
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
  }, [showScore, score]);

  const handleBack = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setAnswerStatus(""); // Reset answer status when going back
    }
  };

  const handleRestart = () => {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
    setAnswerStatus(""); // Reset answer status when restarting
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
              {answerStatus && (
                <div className="answer-status">{answerStatus}</div>
              )}
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
