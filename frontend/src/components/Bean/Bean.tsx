import { useState, useRef } from "react";
import "./Bean.scss";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { CSSTransition } from "react-transition-group";

type BeanProps = {
  nickname: string;
  contents: string;
  color: string;
  img?: string;
  createdAt: string;
  Position: {
    lat: number;
    lng: number;
  };
};

function Bean({
  nickname,
  contents,
  color,
  img,
  createdAt,
  Position,
}: BeanProps) {
  const [isOpen, setIsOpen] = useState(true);
  const beanRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);

  const controlBean = () => {
    const bean = beanRef.current;
    if (bean) {
      bean.className = isOpen ? "bean close" : "bean open";
    }
    setIsOpen(!isOpen);
  };
  return (
    <CustomOverlayMap position={Position} xAnchor={0} yAnchor={0} clickable>
      <div className="bean open" ref={beanRef} onClick={controlBean}>
        <div className="nickname-container" style={{ backgroundColor: color }}>
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
              <div className="down">{contents}</div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </CustomOverlayMap>
  );
}

export default Bean;
