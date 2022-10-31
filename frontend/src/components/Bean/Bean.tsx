import { useState, useEffect, useRef, memo } from "react";
import "./Bean.scss";
import { CSSTransition } from "react-transition-group";
import useColor from "components/hooks/useColor";

type BeanProps = {
  nickname: string;
  content: string;
  color: number;
  img: string;
  createdAt: string;
};

function Bean({ nickname, content, color, img, createdAt }: BeanProps) {
  const [isOpen, setIsOpen] = useState(true);
  const beanRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);
  const [indexToColor] = useColor();

  const controlBean = () => {
    const bean = beanRef.current;
    if (bean) {
      bean.className = isOpen ? "bean close" : "bean open";
    }
    setIsOpen(!isOpen);

    if (!isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };
  useEffect(() => {
    const { current } = colorRef;
    if (current !== null) {
      current.style.color = indexToColor(color).color;
      current.style.backgroundColor = indexToColor(color).backgroundColor;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => controlBean(), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bean open" ref={beanRef} onClick={controlBean}>
      <div className="nickname-container" ref={colorRef}>
        {nickname[0]}
      </div>
      <div className="contents-container">
        <CSSTransition
          in={isOpen}
          nodeRef={nodeRef}
          timeout={500}
          classNames="fade"
          unmountOnExit
          onEnter={() => controlBean}
          onExited={() => controlBean}
        >
          <div ref={nodeRef}>
            <div className="up">
              <div>{nickname}</div>
              <div className="time">just now</div>
            </div>
            <div className="down">{content}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default memo(Bean);
