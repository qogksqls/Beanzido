import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { regionNameState } from "store/atom";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CreateSVG } from "assets/img/chat-button.svg";
import { ReactComponent as BusIcon } from "assets/img/bus.svg";
import { ReactComponent as CycleIcon } from "assets/img/cycle.svg";
import NoticeModal from "components/NoticeModal/NoticeModal";
import ModalPortal from "Portal";
import Lottie from "lottie-react";
import cycle from "assets/img/cycling.json";
import bus from "assets/img/bus.json";
import train from "assets/img/train.json";

function KeywordButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotice, setIsNotice] = useState(false);
  const [regionName] = useRecoilState(regionNameState);

  return (
    <div className="keyword-button-container">
      <CSSTransition
        classNames="transition"
        in={isOpen}
        timeout={500}
        unmountOnExit
      >
        <div className="pop-container">
          <div
            className="pop"
            onClick={() => {
              if (location.pathname.split("/").length === 4) {
                navigate("/keyword");
              } else {
                setIsNotice(true);
                setTimeout(() => setIsNotice(false), 3000);
              }
            }}
          >
            <Lottie animationData={train} className="ani-img pin" />
          </div>
          <div
            className="pop"
            onClick={() => {
              if (location.pathname.split("/").length === 4) {
                if (location.pathname.split("/")[2] === "si") {
                  setIsNotice(true);
                  setTimeout(() => setIsNotice(false), 3000);
                } else {
                  navigate(
                    `/keyword/si/${location.pathname.split("/")[3].slice(0, 2)}`
                  );
                }
              }
            }}
          >
            {location.pathname.split("/").length === 4 ? (
              <Lottie animationData={bus} className="ani-img pin" />
            ) : (
              <BusIcon className="static bus-icon" />
            )}
          </div>
          <div
            className="pop"
            onClick={() => {
              if (
                location.pathname.split("/").length === 4 &&
                location.pathname.split("/")[2] === "dong"
              ) {
                setIsNotice(true);
                setTimeout(() => setIsNotice(false), 3000);
              }
            }}
          >
            {location.pathname.split("/").length === 4 ? (
              location.pathname.split("/")[2] === "dong" ? (
                <Lottie animationData={cycle} className="ani-img pin" />
              ) : (
                <CycleIcon className="static cycle-icon" />
              )
            ) : (
              <CycleIcon className="static cycle-icon" />
            )}
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
      <ModalPortal>
        <CSSTransition
          classNames={"transition"}
          in={isNotice}
          timeout={500}
          unmountOnExit
        >
          <NoticeModal
            message={"현재 위치는 " + regionName + "입니다."}
            close={() => setIsNotice(false)}
          />
        </CSSTransition>
      </ModalPortal>
    </div>
  );
}

export default KeywordButton;
