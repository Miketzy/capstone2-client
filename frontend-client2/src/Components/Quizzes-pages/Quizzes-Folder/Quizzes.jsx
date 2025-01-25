import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false); // State to toggle showing correct answers

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
        "https://capstone2-client.onrender.com/api/save-score",
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
    setShowCorrectAnswers(false); // Reset the correct answers view
    setCurrentQuestion(0);
    fetchQuestions(); // Re-fetch questions when restarting the quiz
  };

  const handleShowCorrectAnswers = () => {
    setShowCorrectAnswers(true); // Show correct answers and explanations
  };

  return (
    <div className="wrapperquiz">
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
            <br />
            <button onClick={handleRestart}>Restart Quiz</button>
            <br />
            <button onClick={handleShowCorrectAnswers}>
              See Correct Answers
            </button>
            {showCorrectAnswers && (
              <div className="correct-answers-section">
                <h2>Correct Answers</h2>
                {questions.map((question, index) => (
                  <div key={index} className="question-answer">
                    <p>
                      <strong>Question: </strong>
                      {question.question}
                    </p>
                    <p>
                      <strong>Your Answer: </strong>
                      {userAnswers[index]}
                    </p>
                    <p>
                      <strong>Correct Answer: </strong>
                      {question.correctAnswer}
                    </p>
                    <p>
                      <strong>Explanation: </strong>
                      {question.explanation}
                    </p>
                    <hr />
                  </div>
                ))}
              </div>
            )}
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
