import "./ChatList.scss";
import ChatItem from "components/ChatItem/ChatItem";
import { ColoredBean } from "store/types";

type ChatProps = {
  chatList: ColoredBean[];
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
