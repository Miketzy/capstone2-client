import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizzesIntro.css";

const QuizzesIntro = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(`/quizzes`);
  };

  return (
    <div className="wrapper">
      <div className="quiz-intro">
        <h2>Welcome to the Davao Oriental Species Quiz!</h2>
        <p>
          Discover the rich biodiversity of Davao Oriental, home to a vast
          variety of animals. From the vibrant forests to the coastal regions,
          this quiz will test your knowledge about the remarkable species found
          in this part of the Philippines. Get ready to learn more about their
          habitats, classifications, and intriguing facts!
        </p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
      <br />
    </div>
  );
};

export default QuizzesIntro;
