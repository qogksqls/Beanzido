import { useState, useEffect, useRef, memo } from "react";
import "./Bean.scss";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { CSSTransition } from "react-transition-group";
import useColor from "components/hooks/useColor";

type BeanProps = {
  nickname: string;
  content: string;
  color: number;
  img: string;
  createdAt: string;
  latitude: number;
  longitude: number;
};

function Bean({
  nickname,
  content,
  color,
  img,
  createdAt,
  latitude,
  longitude,
}: BeanProps) {
  // console.log("콩");
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
  };
  useEffect(() => {
    const { current } = colorRef;
    if (current !== null) {
      current.style.color = indexToColor(color).color;
      current.style.backgroundColor = indexToColor(color).backgroundColor;
    }
  }, []);
  return (
    <CustomOverlayMap
      position={{ lat: latitude, lng: longitude }}
      xAnchor={0}
      yAnchor={0}
      clickable
    >
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
    </CustomOverlayMap>
  );
}

export default memo(Bean);
