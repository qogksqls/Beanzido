import { useEffect, useRef, useState, memo, Component } from "react";
import "./ChatItem.scss";
import useTime from "components/hooks/useTime";
import { ColoredBean } from "store/types";
import useTargetLocation from "components/hooks/useTargetLocation"
type ChatProps = {
  Chatinfo: ColoredBean;
};

function ChatItem({ Chatinfo }: ChatProps) {
  const [initialPosition, SetinitialPosition] = useState({
    lat: Chatinfo.latitude,
    lng: Chatinfo.longitude,
    loaded: true,
    isPanto: true,
  });
  const colorRef = useRef<HTMLDivElement>(null);
  const [elapsedText] = useTime(Chatinfo.createdAt);
  useEffect(() => {
    const { current } = colorRef;
    if (current !== null) {
      current.style.color = Chatinfo.color.color;
      current.style.backgroundColor = Chatinfo.color.backgroundColor;
    }
  });

  return (
    <div className="chat-item" onClick={() => {
      console.log('위치로 이동')
      SetinitialPosition({
        lat: Chatinfo.latitude,
        lng: Chatinfo.longitude,
        loaded: true,
        isPanto: true,
      });
      console.log(initialPosition)
    }}>
      <div className="nickname-container" ref={colorRef}>
        {Chatinfo.nickname[0]}
      </div>
      <div className="contents-container">
        <div className="up">
          <div>{Chatinfo.nickname}</div>
          <div className="time">{elapsedText}</div>
        </div>
        {Chatinfo.content === "내용이 없습니다." ? (
          <div></div>
        ) : (
          <div className="down">{Chatinfo.content}</div>
        )}
        <div className="chat-item-img">
          <img src={Chatinfo.img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatItem);
