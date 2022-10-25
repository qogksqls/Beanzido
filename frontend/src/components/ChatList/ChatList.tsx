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
  const socketUrl = 'wss://ws.postman-echo.com/raw'
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const dto = JSON.stringify({
    Position: {
      lat: 37.5009614732362,
      lng: 127.03972084911923,
    },
    nickname: "괜찮은 황태희",
    contents:
      "안녕하세요 이게 되는지 잘 모르겠네요 이거는 20줄까지는 하고 싶은데",
    color: "red",
    img: "",
    createdAt: Date(),
  })
  useEffect(() => {
    if (lastMessage !== null) {
      setBeanList([...beanList, JSON.parse(lastMessage.data)])
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback((bean: string) => sendMessage(bean), []);

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
          onClick={() => handleClickSendMessage(dto)}
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
