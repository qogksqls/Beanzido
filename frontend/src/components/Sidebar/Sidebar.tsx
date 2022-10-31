import React, { useState, useRef, Dispatch, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ChatList from "components/ChatList/ChatList";
import "./Sidebar.scss";
import openIcon from "assets/img/Expand_right_light.svg";
import closeIcon from "assets/img/Expand_left_light.svg";
import x from "assets/img/x.svg";
// import { isMobile } from "react-device-detect";
import { useSwipeable } from "react-swipeable";

type SideProps = {
  isSideBar: boolean;
  setisSideBar: Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ isSideBar, setisSideBar }: SideProps) {
  const nodeRef = useRef(null);
  const [isFull, setIsFull] = useState(false);
  const [isFirst, setisFirst] = useState(true);
  const [isScroll, setIsScroll] = useState(false);

  function closeSidebar() {
    document.documentElement.style.setProperty("--mobile-border", "10px");
    setIsFull(false);
    setisSideBar(false);
  }

  function openSidebar() {
    document.documentElement.style.setProperty("--inner-height", "300px");
    setIsFull(false);
    setisSideBar(true);
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
        eventData.deltaY < (-1 / 6) * window.innerHeight
      ) {
        setIsFull(true);
        document.documentElement.style.setProperty("--mobile-border", "0");
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100)"
        );
      } else if (
        eventData.dir === "Down" &&
        eventData.deltaY > (1 / 6) * window.innerHeight
      ) {
        document.documentElement.style.setProperty(
          "--inner-height",
          `${300 - eventData.deltaY}px`
        );
        closeSidebar();
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
      <CSSTransition
        in={isSideBar}
        nodeRef={nodeRef}
        timeout={500}
        classNames="slide"
        // unmountOnExit
        onEnter={() => openSidebar}
        onExited={() => closeSidebar}
      >
        <div className="inner">
          <>
            <div className="header">
              {!isFull && <div className="swipe-handle" {...upHandlers}></div>}
              <img
                className="close"
                src={x}
                onClick={closeSidebar}
                alt="close"
              />
            </div>
            <div className="scroll-container" {...sideHandlers}>
              <div className="scroll first">
                <ChatList />
              </div>
              <div className="scroll second">
                <ChatList />
              </div>
            </div>
          </>
        </div>
      </CSSTransition>
      <div className="handle" onClick={isSideBar ? closeSidebar : openSidebar}>
        <img
          src={isSideBar ? closeIcon : openIcon}
          alt={isSideBar ? "close" : "open"}
        />
      </div>
    </div>
  );
}
