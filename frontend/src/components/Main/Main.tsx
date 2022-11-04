import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { beanListState } from "store/atom";
import { Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Main.scss";
import openIcon from "assets/img/Expand_right_light.svg";
import x from "assets/img/x.svg";
import useWebSocket from "react-use-websocket";
import CreateBean from "components/CreateBean/CreateBean";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";
import Sidebar from "components/Sidebar/Sidebar";
import createButton from "assets/img/chat-button.svg";
import FeedbackButtonGif from "assets/img/FeedbackButton.gif";
import FeedbackButtonImg from "assets/img/FeedbackButton.png";
import logo from "assets/img/Logo.svg";
import chat from "assets/img/Chat.svg";
import bigChat from "assets/img/Chat_alt.svg";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const [isFirst, setisFirst] = useState(true);
  const socketurl = process.env.REACT_APP_SOCKET_URL
    ? process.env.REACT_APP_SOCKET_URL
    : "";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });
  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data[0] == "{") {
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
      }
    }
  }, [lastMessage]);
  function switchChat(target: number) {
    if (window.location.pathname === "/") {
      navigate("/sidebar");
    }
    if (target === 1) {
      setisFirst(true);
      document.documentElement.style.setProperty(
        "--scroll-width-default",
        "0px"
      );
    } else {
      setisFirst(false);
      document.documentElement.style.setProperty(
        "--scroll-width-default",
        "100%"
      );
    }
  }
  function clickFeedback() {
    const temp = document.getElementsByClassName("feedback-button");
    if (temp[0] === undefined) {
      window.open(
        "https://forms.gle/dbpsXhqdLRpbFnrT6",
        "_blank",
        "noopener,noreferrer"
      );
      document.getElementsByClassName("feedback-button-center")[0].className =
        "feedback-button";
    } else {
      temp[0].className = "feedback-button-center";
    }

    // navigate("/feedback")
  }

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition
          classNames="transition"
          timeout={500}
          key={location.key}
          onEnter={() => console.log(location.pathname)}
        >
          <Routes location={location}>
            <Route path="sidebar" element={<Sidebar />} />
            <Route
              path="create"
              element={<CreateBean sendMessage={sendMessage} />}
            />
            <Route path="feedback" element={<FeedbackButton />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <div className="create-button">
        <img
          className="create-button-img"
          onClick={() => navigate("/create")}
          src={createButton}
          alt="chat-button"
        />
      </div>
      <div className="sidebar-fix">
        <div className="side-logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              alert("일해라 황태희");
            }}
          />
        </div>
        <div
          className={
            isFirst ? "switch-container first" : "switch-container second"
          }
        >
          <div className="switch all" onClick={() => switchChat(1)}>
            <img src={bigChat} alt="전체보기" />
          </div>
          <div className="switch focus" onClick={() => switchChat(2)}>
            <img src={chat} alt="상세보기" />
          </div>
        </div>
        <div className="feedback-button" onClick={clickFeedback}>
          <img
            className="feedback-button-img"
            src={FeedbackButtonImg}
            alt="feedback-button"
          />
          <img className="feedback-button-img" src={FeedbackButtonGif} alt="" />
          <div>클릭 시 피드백 페이지로 이동</div>
          <div
            className="feedback-close"
            onClick={() => {
              document.getElementsByClassName(
                "feedback-button-center"
              )[0].className = "feedback-button";
              navigate("/");
            }}
          >
            <img src={x} alt="" />
          </div>
        </div>
      </div>
      <div
        className="handle"
        onClick={() => {
          navigate("/sidebar");
        }}
      >
        <img src={openIcon} alt="open" />
      </div>
    </>
  );
}

export default Main;
