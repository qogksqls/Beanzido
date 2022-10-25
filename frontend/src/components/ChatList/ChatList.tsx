import "./ChatList.scss";
import ChatItem from "components/ChatItem/ChatItem";

type MapProps = {
  BeanList: {
    nickname: string;
    contents: string;
    color: string;
    img?: string;
    createdAt: string;
    Position: {
      lat: number;
      lng: number;
    };
  }[];
};

function ChatList({ BeanList }: MapProps) {
  return (
    <div className="chat-list">
      {BeanList.map((Chatinfo, index) => (
        <ChatItem Chatinfo={Chatinfo}/>
      ))}
    </div>
  );
}

export default ChatList;
