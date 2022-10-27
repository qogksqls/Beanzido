import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useWebSocket, { ReadyState } from "react-use-websocket";

import useGeoLocation from "components/hooks/useGeolocation";
import CreateBean from "./components/CreateBean/CreateBean";
import createButton from "./assets/img/chat-button.svg";
import Sidebar from "components/Sidebar/Sidebar";

function App() {
  const [beanList, setBeanList] = useRecoilState(beanListState);

  const { location, initialLocation } = useGeoLocation();
  const [isCreateBean, setIsCreateBean] = useState(false);
  const [isSideBar, setisSideBar] = useState(true);
  const socketurl = process.env.REACT_APP_SOCKET_URL
    ? process.env.REACT_APP_SOCKET_URL
    : "";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl);

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data[0] == "{") {
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
      }
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(
    (bean: string) => sendMessage(bean),
    []
  );

  const dto = JSON.stringify({
    latitude: 37.5009614732362,
    longitude: 127.03972084911923,
    nickname: "괜찮은 황태희",
    content:
      "안녕하세요 이게 되는지 잘 모르겠네요 이거는 20줄까지는 하고 싶은데",
    color: "1",
    img: "",
    createdAt: Date(),
  });

  return (
    <div className="App">
      <img
        className="create-button"
        onClick={() => setIsCreateBean(true)}
        src={createButton}
        alt="chat-button"
      />
      <div style={{ position: "absolute", zIndex: 100 }}>
        <button
          onClick={() => handleClickSendMessage(dto)}
          disabled={readyState !== ReadyState.OPEN}
        >
          Click Me to send 'Hello'
        </button>
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      </div>
      {isCreateBean && <CreateBean setIsCreateBean={setIsCreateBean} />}
      <KakaoMap MyPosition={initialLocation} />
      <Sidebar isSideBar={isSideBar} setisSideBar={setisSideBar} />
    </div>
  );
}

export default App;
