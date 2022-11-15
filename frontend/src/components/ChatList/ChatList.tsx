import { Suspense, lazy } from "react";
import "./ChatList.scss";
import { ColoredBean } from "store/types";
import ChatItemSkeleton from "components/ChatItem/ChatItemSkeleton";
import _ from "lodash";

const ChatItem = lazy(() => import("components/ChatItem/ChatItem"));

type ChatProps = {
  chatList: ColoredBean[];
};

function ChatList({ chatList }: ChatProps) {
  return (
    <div className="chat-list">
      <Suspense
        fallback={new Array(5).fill("").map((_, index) => (
          <ChatItemSkeleton key={index} />
        ))}
      >
        {chatList.map((Chatinfo, index) => (
          <ChatItem Chatinfo={Chatinfo} key={index} />
        ))}
      </Suspense>
    </div>
  );
}

export default ChatList;
