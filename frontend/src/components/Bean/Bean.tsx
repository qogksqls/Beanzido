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
  let today = new Date();
  let elapsedTime: number =
    Math.trunc((today.getTime() - +createdAt) / 1000) - 10;

  function elapsedText(elapsedTime: number) {
    // 초 (밀리초)
    const seconds = 1;
    // 분
    const minute = seconds * 60;
    // 시
    const hour = minute * 60;
    // 일
    const day = hour * 24;

    let elapsedText = "";
    if (elapsedTime < seconds + 10) {
      elapsedText = "방금 전";
    } else if (elapsedTime < minute) {
      elapsedText = elapsedTime + "초 전";
    } else if (elapsedTime < hour) {
      elapsedText = Math.trunc(elapsedTime / minute) + "분 전";
    } else if (elapsedTime < day) {
      elapsedText = Math.trunc(elapsedTime / hour) + "시간 전";
    } else {
      elapsedText = Math.trunc(elapsedTime / day) + "일 전";
    }

    return elapsedText;
  }

  const controlBean = () => {
    const bean = beanRef.current;
    if (bean) {
      bean.className = isOpen ? "bean close" : "bean open";
    }
    setIsOpen(!isOpen);

    if (!isOpen && bean) {
      setTimeout(() => {
        setIsOpen(false);
        bean.className = "bean close";
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
              <div className="time">{elapsedText(elapsedTime)}</div>
            </div>
            <div className="down">{content}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default memo(Bean);
function SimpleDateTimeFormat(
  date: { getTime: () => number },
  arg1: string
): string {
  throw new Error("Function not implemented.");
}
