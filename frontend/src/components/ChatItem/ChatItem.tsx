import "./ChatItem.scss";

type ChatProps = {
  Chatinfo: {
    nickname: string;
    content: string;
    color: string;
    img?: string;
  };
};

function ChatItem({ Chatinfo }: ChatProps) {
  return (
    <div className="chat-item">
      <div
        className="nickname-container"
        style={{ backgroundColor: Chatinfo.color }}
      >
        {Chatinfo.nickname[0]}
      </div>
      <div className="contents-container">
        <div className="up">
          <div>{Chatinfo.nickname}</div>
          <div className="time">just now</div>
        </div>
        <div className="down">{Chatinfo.content}</div>
      </div>
    </div>
  );
}

export default ChatItem;
