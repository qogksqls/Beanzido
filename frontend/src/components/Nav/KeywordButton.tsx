import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { ReactComponent as CreateSVG } from "assets/img/chat-button.svg";
import Lottie from "lottie-react";
import cycle from "assets/img/cycling.json";
import bus from "assets/img/bus.json";
import train from "assets/img/train.json";

function KeywordButton() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="keyword-button-container">
      <CSSTransition
        classNames="transition"
        in={isOpen}
        timeout={500}
        unmountOnExit
      >
        <div className="pop-container">
          <div className="pop" onClick={() => {}}>
            <Lottie animationData={train} className="ani-img pin" />
          </div>
          <div className="pop" onClick={() => {}}>
            <Lottie animationData={bus} className="ani-img pin" />
          </div>
          <div className="pop" onClick={() => {}}>
            <Lottie animationData={cycle} className="ani-img pin" />
          </div>
        </div>
      </CSSTransition>
      <div
        className={"keyword-button" + (isOpen ? " active" : "")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CreateSVG
          className="bean"
          width="34"
          height="34"
          viewBox="3 3 18 18"
        />
      </div>
    </div>
  );
}

export default KeywordButton;
