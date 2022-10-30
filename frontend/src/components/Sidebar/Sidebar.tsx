import React, { useState, useRef, Dispatch, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ChatList from "components/ChatList/ChatList";
import "./Sidebar.scss";
import openIcon from "assets/img/Expand_right_light.svg";
import closeIcon from "assets/img/Expand_left_light.svg";
// import { isMobile } from "react-device-detect";
import { useSwipeable } from "react-swipeable";

type SideProps = {
  isSideBar: boolean;
  setisSideBar: Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ isSideBar, setisSideBar }: SideProps) {
  const nodeRef = useRef(null);
  const innerRef = useRef<HTMLElement>(null);
  const [isFullBar, setIsFullBar] = useState(false);
  function closeSidebar() {
    setisSideBar(false);
  }
  function openSidebar() {
    document.documentElement.style.setProperty("--inner-height", "300px");
    setisSideBar(true);
  }
  useEffect(() => {
    document.documentElement.style.setProperty("--inner-height", "300px");
  }, []);
  const upHandlers = useSwipeable({
    onSwiping: (eventData) => {
      document.documentElement.style.setProperty("--inner-transition", "none");
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
    onSwipedUp: (eventData) => {
      document.documentElement.style.setProperty(
        "--inner-transition",
        "all ease 300ms"
      );
      if (eventData.deltaY < 600 - window.innerHeight) {
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100)"
        );
      } else {
        document.documentElement.style.setProperty(
          "--inner-transition",
          "all ease 300ms"
        );
        document.documentElement.style.setProperty("--inner-height", "300px");
      }
    },
    onSwipedDown: (eventData) => {
      document.documentElement.style.setProperty(
        "--inner-transition",
        "all ease 300ms"
      );
      if (eventData.deltaY > 200) {
        closeSidebar();
      } else {
        document.documentElement.style.setProperty("--inner-height", "300px");
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
        unmountOnExit
        onEnter={() => openSidebar}
        onExited={() => closeSidebar}
      >
        <div className="inner">
          <>
            <div className="header" {...upHandlers}>
              swipe here
            </div>
            <div className="scroll ">
              <ChatList />
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
