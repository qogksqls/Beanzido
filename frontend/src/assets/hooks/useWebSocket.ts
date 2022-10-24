import { useState, useEffect } from "react";

export enum MySocketState {
  onNewMessageReceived = 'onNewMessageReceived',
  onConnectionFailed = 'onConnectionFaield',
  onConnectionOpened = 'onConnectionOpened'
}


export const useMySocket = (
    onConnectionStateChanged: (state: MySocketState) => void
  ) => {

  //응답받은 문자열을 넘겨줄 state
  const [responseMessage, setResponseMessage] = useState('')

  // 연결을 시작한다.
  useEffect(() => {
    connectStart()
  }, [])

  
  //소켓 연결 시작.
  const connectStart = () => {
    const ws = new WebSocket("ws://localhost:8080/chat-server/map");
    ws.onmessage = (e) => {
      e.preventDefault();      
      const data = e.data;
      
      setResponseMessage(data)
      onConnectionStateChanged(MySocketState.onNewMessageReceived)
    }

    ws.onopen = () => {
      onConnectionStateChanged(MySocketState.onConnectionOpened)
    };

    ws.onclose = () => {
      onConnectionStateChanged(MySocketState.onConnectionFailed)
    };
  }

  return {responseMessage: responseMessage}
}
