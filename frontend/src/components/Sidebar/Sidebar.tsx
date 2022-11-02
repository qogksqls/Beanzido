import React, { useState, useEffect, useRef, Dispatch } from "react";
import { useRecoilState } from "recoil";
import { beanListState, focusedState, tapSidebarState } from "store/atom";
import { CSSTransition } from "react-transition-group";
import { useSwipeable } from "react-swipeable";
import ChatList from "components/ChatList/ChatList";
import "./Sidebar.scss";
import closeIcon from "assets/img/Expand_left_light.svg";
import x from "assets/img/x.svg";
import logo from "assets/img/Logo.svg";
import chat from "assets/img/Chat.svg";
import bigChat from "assets/img/Chat_alt.svg";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nodeRef = useRef(null);
  const [isFull, setIsFull] = useState(false);
  const [isFirst, setisFirst] = useState(true);
  const [isScroll, setIsScroll] = useState(false);
  const [beanList] = useRecoilState(beanListState);
  const [focused] = useRecoilState(focusedState);
  const [tapSidebar, setTapSidebar] = useRecoilState(tapSidebarState);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSideBar) {
  //     document.documentElement.style.setProperty("--inner-height", "300px");
  //     setIsFull(false);
  //   } else {
  //     document.documentElement.style.setProperty("--mobile-border", "10px");
  //     setIsFull(false);
  //   }
  // }, [isSideBar]);

  // useEffect(() => {
  //   if (tapSidebar) {
  //     if (!isSideBar) {
  //       setisSideBar(true);
  //       setisFirst(false);
  //       document.documentElement.style.setProperty(
  //         "--scroll-width-default",
  //         "100%"
  //       );
  //     }
  //     setTapSidebar(false);
  //   }
  // }, [tapSidebar]);

  function switchChat(target: number) {
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

  const upHandlers = useSwipeable({
    onSwiping: (eventData) => {
      document.documentElement.style.setProperty("--inner-transition", "");
      if (
        eventData.deltaY < 270 &&
        eventData.deltaY > 300 - window.innerHeight
      ) {
        document.documentElement.style.setProperty(
          "--inner-height",
          `${300 - eventData.deltaY}px`
        );
      }
    },
    onSwiped: (eventData) => {
      document.documentElement.style.setProperty(
        "--inner-transition",
        "all ease 300ms"
      );
      document.documentElement.style.setProperty("--inner-height", "300px");
      if (
        eventData.dir === "Up" &&
        eventData.deltaY < (-1 / 8) * window.innerHeight
      ) {
        setIsFull(true);
        document.documentElement.style.setProperty("--mobile-border", "0");
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100)"
        );
      } else if (
        eventData.dir === "Down" &&
        eventData.deltaY > (1 / 8) * window.innerHeight
      ) {
        document.documentElement.style.setProperty(
          "--inner-height",
          `${300 - eventData.deltaY}px`
        );
        navigate("/");
      }
    },
  });

  const sideHandlers = useSwipeable({
    onSwipeStart: (eventData) => {
      if (eventData.dir === "Down" || eventData.dir === "Up") {
        setIsScroll(true);
      }
    },
    onSwiping: (eventData) => {
      if (!isScroll) {
        document.documentElement.style.setProperty("--scroll-transition", "");
        if (
          isFirst &&
          eventData.deltaX > -1 * window.innerWidth &&
          eventData.deltaX <= 30
        ) {
          document.documentElement.style.setProperty(
            "--scroll-width",
            `${eventData.deltaX}px`
          );
        } else if (
          !isFirst &&
          eventData.deltaX < window.innerWidth &&
          eventData.deltaX >= -30
        ) {
          document.documentElement.style.setProperty(
            "--scroll-width",
            `${eventData.deltaX}px`
          );
        }
      }
    },
    onSwiped: (eventData) => {
      document.documentElement.style.setProperty("--scroll-width", "0px");
      document.documentElement.style.setProperty(
        "--scroll-transition",
        "all ease 300ms"
      );
      setIsScroll(false);
      if (
        eventData.dir === "Left" &&
        eventData.deltaX < (-1 / 4) * window.innerWidth
      ) {
        setisFirst(false);
        document.documentElement.style.setProperty(
          "--scroll-width-default",
          "100%"
        );
      } else if (
        eventData.dir === "Right" &&
        eventData.deltaX > (1 / 4) * window.innerWidth
      ) {
        setisFirst(true);
        document.documentElement.style.setProperty(
          "--scroll-width-default",
          "0px"
        );
      }
    },
  });
  return (
    <div className="sidebar" ref={nodeRef}>
      <div className="slide-handle" onClick={() => navigate("/")}>
        <img src={closeIcon} alt="open" />
      </div>
      <div className="inner">
        <div className="header">
          <img src={logo} className="side-logo" alt="logo" />
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
          {!isFull && <div className="swipe-handle"></div>}
          <img
            className="close"
            src={x}
            onClick={() => navigate("/")}
            alt="close"
          />
        </div>
        <div className="scroll-container">
          <div className="scroll first">
            <ChatList chatList={beanList} />
          </div>
          <div className="scroll second">
            <ChatList chatList={focused} />
          </div>
        </div>
      </div>
    </div>
  );
}
