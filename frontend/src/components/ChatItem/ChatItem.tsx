import { useEffect, useRef, useState, memo, Component } from "react";
import "./ChatItem.scss";
import useTime from "components/hooks/useTime";
import Lottie from "lottie-react";
import locationAni from "assets/img/location.json";
import locationImg from "assets/img/location.svg";
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
        <div className="location">
          {/* <Lottie animationData={locationAni} className="location-img" /> */}
          <img src={locationImg} className="location-img" alt="" />
          {Chatinfo.location}
        </div>
        {Chatinfo.content === "" ? (
          <div></div>
        ) : (
          <div className="down">
            <div style={{ whiteSpace: "pre-line" }}>
              {Chatinfo.content.replaceAll("<br/>", "\r\n")}
            </div>
          </div>
        )}
        <div className="chat-item-img">
          <img src={Chatinfo.img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatItem);
