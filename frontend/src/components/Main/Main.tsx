import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { beanListState } from "store/atom";
import { Outlet } from "react-router-dom";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Sidebar from "components/Sidebar/Sidebar";
import CreateBean from "components/CreateBean/CreateBean";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";
import "./Main.scss";
import openIcon from "assets/img/Expand_right_light.svg";
import x from "assets/img/x.svg";

import Lottie from "lottie-react";
import aroundTheWorld from "assets/img/around-the-world.json";
import bubbleChat from "assets/img/bubble-chat.json";
import likeAni from "assets/img/like.json";
import locationAni from "assets/img/location.json";
import searchAni from "assets/img/search.json";

import createButton from "assets/img/chat-button.svg";
import logo from "assets/img/Logo.svg";
import chat from "assets/img/Chat.svg";

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
  function switchImg() {
    const temp = document.getElementsByClassName("aroundTheWorld");
    if (temp[0] === undefined) {
      document.getElementsByClassName("block")[0].className =
        "ani-img aroundTheWorld";
      document.getElementsByClassName("ani-img searchAni")[0].className =
        "block";
    } else {
      document.getElementsByClassName("block")[0].className =
        "ani-img searchAni";
      temp[0].className = "block";
    }
    // console.log(temp[0].className);
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
          // onEnter={() => console.log(location.pathname)}
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
            <Lottie animationData={bubbleChat} className="ani-img bubbleChat" />
          </div>
          <div className="switch focus" onClick={() => switchChat(2)}>
            <img src={chat} alt="상세보기" />
          </div>
        </div>
        {/* <Lottie animationData={aroundTheWorld} /> */}
        {/* <Lottie animationData={bubbleChat} /> */}
        {/* <Lottie animationData={likeAni} />
        <Lottie animationData={locationAni} />
        <Lottie animationData={searchAni} /> */}
        <div className="feedback-button" onClick={clickFeedback}>
          <Lottie className="feedback-button-img" animationData={likeAni} />
          {/* <img className="feedback-button-img" src={FeedbackButtonGif} alt="" /> */}
          <p>클릭 시 피드백 페이지로 이동</p>
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
      <div className="bottom-bar">
        <Lottie
          animationData={bubbleChat}
          className="ani-img bubleChat"
          onClick={() => switchChat(2)}
        />
        <img
          className="create-button-img"
          onClick={() => navigate("/create")}
          src={createButton}
          alt="chat-button"
        />
        <div onClick={switchImg}>
          <Lottie
            animationData={aroundTheWorld}
            className="ani-img aroundTheWorld"
          />
          <Lottie animationData={searchAni} className="block" />
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
