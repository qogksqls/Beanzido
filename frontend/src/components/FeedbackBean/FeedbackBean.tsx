import React, { useState } from "react";
import "./FeedbackBean.scss";


function FeedbackBean() {
  return (
    <>
      <button
      className="feedback-button"
      onClick={() => window.open('https://forms.gle/wVx625841uUueh9Q9', '_blank', 'noopener,noreferrer')}>
        FeedBack!
      </button>
    </>
  );
}

export default FeedbackBean;
