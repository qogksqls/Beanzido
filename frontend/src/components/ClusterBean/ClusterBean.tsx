import { useState, useEffect, useRef, memo } from "react";
import "./ClusterBean.scss";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { CSSTransition } from "react-transition-group";
import useColor from "components/hooks/useColor";

type BeanProps = {
  nickname: string[];
  content: string;
  color: number[];
  img: string;
  createdAt: string;
};

function ClusterBean({ nickname, content, color, img, createdAt }: BeanProps) {
  const [isOpen, setIsOpen] = useState(true);
  const beanRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);
  const [indexToColor] = useColor();
  const controlBean = () => {
    const bean = beanRef.current;
    if (bean) {
      bean.className = isOpen ? "cluster-bean close" : "cluster-bean open";
    }
    setIsOpen(!isOpen);
    if (!isOpen && bean) {
      setTimeout(() => {
        setIsOpen(false);
        bean.className = "cluster-bean close";
      }, 3000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => controlBean(), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cluster-bean open" ref={beanRef} onClick={controlBean}>
      <div
        className={
          color.length > 2 ? "nickname-cluster three" : "nickname-cluster two"
        }
      >
        {color.length > 2 && (
          <div
            className="nickname-container third"
            style={{
              color: indexToColor(color[0]).color,
              backgroundColor: indexToColor(color[0]).backgroundColor,
            }}
          >
            {nickname[0][0]}
          </div>
        )}
        <div
          className="nickname-container second"
          style={{
            color: indexToColor(color[color.length - 2]).color,
            backgroundColor: indexToColor(color[color.length - 2])
              .backgroundColor,
          }}
        >
          {nickname[color.length - 2][0]}
        </div>
        <div
          className="nickname-container"
          style={{
            color: indexToColor(color[color.length - 1]).color,
            backgroundColor: indexToColor(color[color.length - 1])
              .backgroundColor,
          }}
        >
          {nickname[color.length - 1][0]}
        </div>
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
              <div>{nickname[0]}</div>
              <div className="time">just now</div>
            </div>
            <div className="down">{content}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default memo(ClusterBean);
