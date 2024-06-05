import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Dashboard.css";
import { server } from "../App";
import { CalculatorIcon } from "./Home";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const quizTaken = user.quizGiven;

  const handleLogOut = async () => {
    try {
      await axios.get(`${server}/logout`, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleStartQuiz = async () => {
    try {
      const { data } = await axios.get(`${server}/quiz/id`, {
        withCredentials: true,
      });
      const { quizId } = data;
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error fetching quiz ID:", error);
      navigate("/dashboard");
    }
  };

  const handleReview = () => {
    navigate("/quiz-review");
  };

  const renderQuizzes = () => {
    return (
      <div className="card-container">
        {Object.keys(user.quizStats.quizStats).map((tag) => (
          <div key={tag} className="card">
            <div className="card-header">
              <h2>{tag.charAt(0).toUpperCase() + tag.slice(1)}</h2>
            </div>
            <div className="card-content">
              <div className="flex-container">
                <span className="text-gray">Easy</span>
                <span className="text-gray">
                  {user.quizStats.quizStats[tag].easy[1]} /{" "}
                  {user.quizStats.quizStats[tag].easy[0]}
                </span>
              </div>
              <div className="flex-container">
                <span className="text-gray">Medium</span>
                <span className="text-gray">
                  {user.quizStats.quizStats[tag].medium[1]} /{" "}
                  {user.quizStats.quizStats[tag].medium[0]}
                </span>
              </div>
              <div className="flex-container">
                <span className="text-gray">Hard</span>
                <span className="text-gray">
                  {user.quizStats.quizStats[tag].hard[1]} /{" "}
                  {user.quizStats.quizStats[tag].hard[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Link to="#" className="logo-link">
          <CalculatorIcon className="icon" />
        </Link>

        <nav className="nav">
          <button className="button start-quiz" onClick={handleLogOut}>
            Logout
          </button>
        </nav>
      </header>
      <main className="main">
        <section className="summary-section">
          <h1 className="summary-title">Welcome to the Quiz Dashboard</h1>
          {!quizTaken && (
            <button className="button start-quiz" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          )}
          {quizTaken && (
            <>
              <p className="summary-description">
                Here you can view your quiz results and statistics.
              </p>
              <button className="button start-quiz" onClick={handleReview}>
                Review Quiz
              </button>

              {renderQuizzes()}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
