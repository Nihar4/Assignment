import React from "react";
import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../App";
import axios from "axios";

const Home = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();
  const handleStartQuizClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  const handleLogOut = async () => {
    try {
      await axios.get(`${server}/logout`, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="#" className="logo-link">
          <CalculatorIcon className="icon" />
        </Link>
        {!isAuthenticated && (
          <nav className="nav">
            <Link to="/login" className="nav-link login-button">
              Login
            </Link>
            <Link to="/register" className="nav-link signup-button">
              Sign Up
            </Link>
          </nav>
        )}
        {isAuthenticated && (
          <nav className="nav">
            <button className="button start-quiz" onClick={handleLogOut}>
              Logout
            </button>
          </nav>
        )}
      </header>
      <main className="main">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Test Your Maths Knowledge with Our Fun Quizzes
              </h1>
              <p className="hero-description">
                Engage your mind and have a blast with our diverse range of
                maths quizzes on various topics. Challenge yourself and compete
                with friends.
              </p>
              <div className="hero-buttons">
                <button
                  className="button start-quiz"
                  onClick={handleStartQuizClick}
                >
                  Start a Maths Quiz
                </button>
                {!isAuthenticated && (
                  <Link to="/register" className="button signup">
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
            <div className="hero-secondary-text">
              <div className="tag">Engaging Maths Quizzes</div>
              <h2 className="secondary-title">Challenge Yourself, Have Fun</h2>
              <p className="secondary-description">
                Our maths quizzes cover a wide range of topics, from algebra and
                geometry to probability and calculus. Test your knowledge and
                see how you measure up against your friends.
              </p>
            </div>
          </div>
          {/* <img src="/placeholder.svg" alt="Hero" className="hero-image" /> */}
        </section>
        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <div className="tag">Key Features</div>
              <h2 className="features-title">
                Elevate Your Maths Quiz Experience
              </h2>
              <p className="features-description">
                Our maths quiz app offers a range of features to make your
                experience more engaging and rewarding.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature">
                <h3 className="feature-title">Personalized Maths Quizzes</h3>
                <p className="feature-description">
                  Discover maths quizzes tailored to your interests and skill
                  level, ensuring a truly engaging experience.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title">Leaderboards</h3>
                <p className="feature-description">
                  Compete with friends and see how you stack up on our dynamic
                  leaderboards.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title">Progress Tracking</h3>
                <p className="feature-description">
                  Monitor your progress, track your achievements, and unlock new
                  maths challenges.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title">Multiplayer Modes</h3>
                <p className="feature-description">
                  Challenge your friends in real-time and see who comes out on
                  top in maths.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title">Adaptive Difficulty</h3>
                <p className="feature-description">
                  Our maths quizzes adjust to your skill level, ensuring a
                  rewarding and challenging experience.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title">Detailed Analytics</h3>
                <p className="feature-description">
                  Dive into your maths performance data and identify areas for
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">
          &copy; 2024 Maths Quiz App. All rights reserved.
        </p>
        <nav className="footer-nav">
          <Link to="/" className="footer-link">
            Terms of Service
          </Link>
          <Link to="/" className="footer-link">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export function CalculatorIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

export default Home;
