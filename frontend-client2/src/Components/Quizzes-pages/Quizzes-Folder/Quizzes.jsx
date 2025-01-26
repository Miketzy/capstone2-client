import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://capstone2-client.onrender.com/api/random-questions"
      );
      setQuestions(response.data);
      setUserAnswers(Array(response.data.length).fill(null));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;
    setUserAnswers(updatedAnswers);

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
      saveScore(score);
    }
  }, [showScore, score]);

  const handleBack = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setShowScore(false);
    setShowCorrectAnswers(false);
    setCurrentQuestion(0);
    fetchQuestions();
  };

  const handleShowCorrectAnswers = () => {
    setShowCorrectAnswers(true);
  };

  const getAnswerClass = (answer, correctAnswer) => {
    return answer === correctAnswer ? "highlight-correct" : "";
  };

  return (
    <div className="wrapperquiz">
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            <h2 className="score-title">
              You scored {score} out of {questions.length}
            </h2>
            <button className="bio-button" onClick={handleRestart}>
              Restart Quiz
            </button>
            <button
              className="bio-button see-answers-button"
              onClick={handleShowCorrectAnswers}
            >
              See Correct Answers
            </button>
            {showCorrectAnswers && (
              <div className="correct-answers-section">
                <h3>Correct Answers</h3>
                {questions.map((question, index) => (
                  <div key={index} className="question-answer">
                    <p>
                      <strong>Question:</strong> {question.question}
                    </p>
                    <p>
                      <strong>Your Answer:</strong>{" "}
                      {userAnswers[index] || "No answer"}
                    </p>
                    <p>
                      <strong>Correct Answer:</strong> {question.correctAnswer}
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
                {["optionA", "optionB", "optionC", "optionD"].map((key) => (
                  <button
                    key={key}
                    className={`optionB ${getAnswerClass(
                      questions[currentQuestion][key],
                      questions[currentQuestion].correctAnswer
                    )}`}
                    onClick={() =>
                      handleAnswerClick(questions[currentQuestion][key])
                    }
                  >
                    {questions[currentQuestion][key]}
                  </button>
                ))}
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
