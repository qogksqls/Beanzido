import React, { useState, Dispatch, SetStateAction} from "react";
import "./FeedbackButton.scss";


type FeedbackProps = {
  setIsFeedbackButton: Dispatch<SetStateAction<boolean>>;
}; 

export default function FeedbackButton({setIsFeedbackButton}: FeedbackProps) {

  return (
    <>
    <div
        className="feedback-button-back"
        onClick={() => setIsFeedbackButton(false)}
      ></div>
      <div className="feedback-box"
            onClick={() => window.open('https://forms.gle/wVx625841uUueh9Q9', '_blank', 'noopener,noreferrer')}>
        <h3>Feedback for Beanzido!</h3>
      </div>
      {/* <button
      className="feedback-button"
      onClick={() => window.open('https://forms.gle/wVx625841uUueh9Q9', '_blank', 'noopener,noreferrer')}>
        FeedBack!
      </button> */}
    </>
  );
}

