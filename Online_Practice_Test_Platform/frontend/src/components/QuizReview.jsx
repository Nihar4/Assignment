import React from "react";
import "../css/Quiz.css";

export default function QuizReview({ user }) {
  const allQue = user.quizStats.allQue;

  return (
    <div className="quiz-container review">
      <div className="quiz-content">
        {allQue.map((question, index) => (
          <div key={index} className="quiz-card">
            <h2 className="quiz-question-title">Question {index + 1}</h2>
            <p className="quiz-question-text">{question.question}</p>
            <div className="quiz-options">
              {question.answers.map((option, index) => (
                <div className="quiz-option" key={index}>
                  <button className="quiz-option-button">
                    {index === question.correctAns ? (
                      <CheckIcon />
                    ) : index === question.selectAns &&
                      question.selecteAns !== question.correctAns ? (
                      <XIcon />
                    ) : (
                      <CircleIcon />
                    )}
                  </button>
                  <span
                    style={{
                      color:
                        index === question.correctAns
                          ? "rgb(34 197 94)"
                          : index === question.selectAns &&
                            question.selecteAns !== question.correctAns
                          ? "rgb(239 68 68)"
                          : "black",
                    }}
                  >
                    {option.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
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

function CheckIcon(props) {
  return (
    <svg
      {...props}
      style={{
        backgroundColor: "rgb(34 197 94)",
        color: "white",
        width: "30px",
        height: "30px",
        borderRadius: "5px",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="rgb(34 197 94)"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      style={{
        backgroundColor: "rgb(239 68 68)",
        color: "white",
        width: "30px",
        height: "30px",
        borderRadius: "5px",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="rgb(239 68 68)"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
