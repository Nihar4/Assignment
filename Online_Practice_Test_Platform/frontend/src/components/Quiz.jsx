import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Quiz.css";
import { server } from "../App";
import toast from "react-hot-toast";

export default function Quiz() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [question, setQuestion] = useState(null);
  const { id: quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    startQuiz();
  }, []);

  const startQuiz = async () => {
    try {
      const { data } = await axios.get(
        `${server}/quiz/start?quizId=${quizId}`,
        {
          withCredentials: true,
        }
      );
      setQuestion(data.question);
      setLoading(false);
    } catch (error) {
      console.error("Error starting the quiz:", error);
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNextClick = async () => {
    if (question._id && selectedOption !== null) {
      try {
        setLoading(true);

        const { data } = await axios.post(
          `${server}/quiz/next`,
          {
            questionId: question._id,
            selectedAnswer: selectedOption,
          },
          {
            withCredentials: true,
          }
        );

        if (data.submit) setSubmit(true);
        if (data.complete) return navigate("/dashboard");
        setQuestion(data.question);
        setSelectedOption(null);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching the next question:", error);
      }
    } else {
      toast.error("Select Option First");
    }
  };

  if (loading) {
    return <div className="quiz-container"></div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <div className="quiz-card">
          <h2 className="quiz-question-title">Question {question.no}</h2>
          <p className="quiz-question-text">{question.question}</p>
          <div className="quiz-options">
            {question.answers.map((option, index) => (
              <div className="quiz-option" key={index}>
                <button
                  className="quiz-option-button"
                  onClick={() => handleOptionClick(index)}
                >
                  <CircleIcon
                    fill={selectedOption === index ? "black" : "none"}
                  />
                </button>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="quiz-next-button-container">
          <button className="button start-quiz" onClick={handleNextClick}>
            {submit ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" fill={props.fill} />
    </svg>
  );
}
