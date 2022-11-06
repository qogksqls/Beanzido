import { useEffect, useRef, memo } from "react";
import "./ChatItem.scss";
import useTime from "components/hooks/useTime";
import { ColoredBean } from "store/types";

type ChatProps = {
  Chatinfo: ColoredBean;
};

function ChatItem({ Chatinfo }: ChatProps) {
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
    <div className="chat-item">
      <div className="nickname-container" ref={colorRef}>
        {Chatinfo.nickname[0]}
      </div>
      <div className="contents-container">
        <div className="up">
          <div>{Chatinfo.nickname}</div>
          <div className="time">{elapsedText}</div>
        </div>
        <div className="location">{Chatinfo.location}</div>
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
