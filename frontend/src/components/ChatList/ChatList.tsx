import React, { useState, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import "./ChatList.scss";
import ChatItem from "components/ChatItem/ChatItem";
import { beanListState } from "store/atom";

function ChatList() {
  const [beanList, setBeanList] = useRecoilState(beanListState);

  return (
    <div className="chat-list">
      {beanList.map((Chatinfo, index) => (
        <ChatItem Chatinfo={Chatinfo} key={index} />
      ))}
    </div>
  );
}

export default ChatList;
