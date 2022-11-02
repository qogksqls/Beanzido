import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import "./FeedbackButton.scss";

export default function FeedbackButton() {
  const navigate = useNavigate();
  return (
    <>
      {/* <div
        className="feedback-box"
        onClick={() =>
          window.open(
            "https://forms.gle/wVx625841uUueh9Q9",
            "_blank",
            "noopener,noreferrer"
          )
        }
      >
        <h3>Feedback for Beanzido!</h3>
      </div> */}
      <div
        className="feedback"
        onClick={() =>
          window.open(
            "https://forms.gle/dbpsXhqdLRpbFnrT6",
            "_blank",
            "noopener,noreferrer"
          )
        }
      >
        <h5>Beanzido를 위해 피드백을 남겨주세요!</h5>
      </div>
      {/* <button
      className="feedback-button"
      onClick={() => window.open('https://forms.gle/wVx625841uUueh9Q9', '_blank', 'noopener,noreferrer')}>
        FeedBack!
      </button> */}
      <div className="feedback-button-back" onClick={() => navigate("/")}></div>
    </>
  );
}
