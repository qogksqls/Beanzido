import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./Sidebar.scss";
import openIcon from "assets/img/Expand_right_light.svg"
import closeIcon from "assets/img/Expand_left_light.svg"

type SideProps = {
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

export default function Sidebar({ BeanList }: SideProps) {
  const [isOpen, setIsOpen] = useState(true);
  const nodeRef = useRef(null);

  function closeSidebar() {
    setIsOpen(false);
  }
  function openSidebar() {
    setIsOpen(true);
  }
  return (
    <div className="sidebar" ref={nodeRef}>
      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={500}
        classNames="slide"
        unmountOnExit
        onEnter={() => openSidebar}
        onExited={() => closeSidebar}
      >
        <div className="inner">ss</div>
      </CSSTransition>
      <div className="handle" onClick={isOpen ? closeSidebar : openSidebar}>
        <img src={isOpen ? closeIcon : openIcon} alt={isOpen ? 'close' : 'open'} />
        </div>
    </div>
  );
}
