import React, { useState, useRef, Dispatch } from "react";
import { CSSTransition } from "react-transition-group";
import "./Sidebar.scss";
import openIcon from "assets/img/Expand_right_light.svg"
import closeIcon from "assets/img/Expand_left_light.svg"

type SideProps = {
  isSideBar: boolean;
  setisSideBar: Dispatch<React.SetStateAction<boolean>>  ;
  BeanList: {
    nickname: string;
    contents: string;
    color: string;
    img?: string;
    createdAt: string;
    Position: {
      lat: number;
      lng: number;
    };
  }[];
};

export default function Sidebar({ isSideBar, setisSideBar, BeanList }: SideProps) {
  const nodeRef = useRef(null);

  function closeSidebar() {
    setisSideBar(false);
  }
  function openSidebar() {
    setisSideBar(true);
  }
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
        <div className="inner">ss</div>
      </CSSTransition>
      <div className="handle" onClick={isSideBar ? closeSidebar : openSidebar}>
        <img src={isSideBar ? closeIcon : openIcon} alt={isSideBar ? 'close' : 'open'} />
        </div>
    </div>
  );
}
