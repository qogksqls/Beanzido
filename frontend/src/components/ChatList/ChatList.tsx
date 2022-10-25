import React, { useState, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import "./ChatList.scss";
import ChatItem from "components/ChatItem/ChatItem";
import { beanListState } from "store/atom";

// type MapProps = {
//   BeanList: {
//     nickname: string;
//     contents: string;
//     color: string;
//     img?: string;
//     createdAt: string;
//     Position: {
//       lat: number;
//       lng: number;
//     };
//   }[];
// };

function ChatList() {
  const socketUrl = 'wss://echo.websocket.org'
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage)
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  return (
    <div className="chat-list">
      <div>
        <button
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Click Me to send 'Hello'
        </button>
        <span>The WebSocket is currently {connectionStatus}</span>
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      </div>
      {beanList.map((Chatinfo, index) => (
        <ChatItem Chatinfo={Chatinfo} key={index} />
      ))}
    </div>
  );
}

export default ChatList;
