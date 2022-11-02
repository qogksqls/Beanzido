import "./ChatList.scss";
import ChatItem from "components/ChatItem/ChatItem";

type ChatProps = {
  chatList: {
    nickname: string;
    content: string;
    color: number;
    img: string;
    createdAt: string;
    latitude: number;
    longitude: number;
  }[];
};

function ChatList({ chatList }: ChatProps) {
  return (
    <div className="chat-list">
      {chatList.map((Chatinfo, index) => (
        <ChatItem Chatinfo={Chatinfo} key={index} />
      ))}
    </div>
  );
}

export default ChatList;
