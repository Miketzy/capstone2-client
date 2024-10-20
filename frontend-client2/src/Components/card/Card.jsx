import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      <div className="card-container">
        <Link to="/mapping" className="card-link">
          <div className="cardbox">
            <h1>MAP</h1>
          </div>
        </Link>

        <Link to="/database" className="card-link">
          <div className="cardbox">
            <h1>DATABASE</h1>
          </div>
        </Link>

        <div className="cardbox">
          <h1>QUIZZES</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;
