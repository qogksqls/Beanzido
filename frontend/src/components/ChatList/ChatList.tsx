import { lazy, Suspense } from "react";
import "./ChatList.scss";
import { ColoredBean } from "store/types";
import ChatitemSkeleton from "components/ChatItem/ChatitemSkeleton";
const ChatItem = lazy(() => import("components/ChatItem/ChatItem"));

type ChatProps = {
  chatList: ColoredBean[];
};

function ChatList({ chatList }: ChatProps) {
  return (
    <div className="chat-list">
      {chatList.map((Chatinfo, index) => (
        <Suspense fallback={<ChatitemSkeleton />}>
          <ChatItem Chatinfo={Chatinfo} key={index} />
        </Suspense>
      ))}
    </div>
  );
}

export default ChatList;
