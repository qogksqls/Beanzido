import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "store/atom";
import "./Nav.scss";
import createButton from "assets/img/chat-button.svg";
import openIcon from "assets/img/Expand_right_light.svg";
import Lottie from "lottie-react";
import aroundTheWorld from "assets/img/around-the-world.json";
import bubbleChat from "assets/img/bubble-chat.json";
import likeAni from "assets/img/like.json";
import locationAni from "assets/img/location.json";
import searchAni from "assets/img/search.json";
import chat from "assets/img/Chat.svg";
import logo from "assets/img/Logo.svg";
import x from "assets/img/x.svg";

export default function Nav() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const [isKeyword, setIsKeyword] = useState(false);

  // function switchImg() {
  //   const temp = document.getElementsByClassName("aroundTheWorld");
  //   if (temp[0] === undefined) {
  //     document.getElementsByClassName("block")[0].className =
  //       "ani-img aroundTheWorld";
  //     document.getElementsByClassName("ani-img searchAni")[0].className =
  //       "block";
  //   } else {
  //     document.getElementsByClassName("block")[0].className =
  //       "ani-img searchAni";
  //     temp[0].className = "block";
  //   }
  //   console.log(temp[0].className);
  // }
  return (
    <nav>
      <div className="bottom-bar">
        <Lottie
          animationData={bubbleChat}
          className="ani-img bubleChat"
          onClick={() => navigate("/sidebar")}
        />
        <img
          className="create-button-img"
          onClick={() => navigate("/create")}
          src={createButton}
          alt="chat-button"
        />
        <div onClick={() => setIsKeyword(!isKeyword)}>
          <Lottie
            animationData={isKeyword ? searchAni : aroundTheWorld}
            className={
              isKeyword ? "ani-img searchAni" : "ani-img aroundTheWorld"
            }
          />
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
            sidebar === 0 ? "switch-container first" : "switch-container second"
          }
        >
          <div
            className="switch all"
            onClick={() => {
              navigate("/sidebar");
              setSidebar(0);
            }}
          >
            <Lottie animationData={bubbleChat} className="ani-img bubbleChat" />
          </div>
          <div
            className="switch focus"
            onClick={() => {
              navigate("/sidebar");
              setSidebar(1);
            }}
          >
            <img src={chat} alt="상세보기" />
          </div>
        </div>
        <div className="feedback-button" onClick={() => navigate("/feedback")}>
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
    </nav>
  );
}
