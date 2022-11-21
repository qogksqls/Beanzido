import { useNavigate } from "react-router-dom";
import "./FeedbackButton.scss";
import Lottie from "lottie-react";
import likeAni from "assets/img/like.json";
import { ReactComponent as X } from "assets/img/x.svg";

export default function FeedbackButton() {
  const navigate = useNavigate();

  // function clickFeedback() {
  //   const temp = document.getElementsByClassName("feedback-button");
  //   if (temp[0] === undefined) {
  //     window.open(
  //       "https://forms.gle/dbpsXhqdLRpbFnrT6",
  //       "_blank",
  //       "noopener,noreferrer"
  //     );
  //     document.getElementsByClassName("feedback-button-center")[0].className =
  //       "feedback-button";
  //   } else {
  //     temp[0].className = "feedback-button-center";
  //   }
  //   // navigate("/feedback")
  // }

  return (
    <>
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
        <Lottie className="feedback-button-img" animationData={likeAni} />
        <p>클릭 시 피드백 페이지로 이동</p>
        <X
          className="feedback-close"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
        />
      </div>
      <div
        className="feedback-back"
        onClick={() => {
          navigate("/");
        }}
      ></div>
    </>
  );
}
