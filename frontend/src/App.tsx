import { useState, useEffect, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useWebSocket, { ReadyState } from "react-use-websocket";

import useGeoLocation from "components/hooks/useGeolocation";
import CreateBean from "./components/CreateBean/CreateBean";
import Sidebar from "components/Sidebar/Sidebar";
import createButton from "./assets/img/chat-button.svg";
import FeedbackButtonImg from "./assets/img/FeedbackButton.gif";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";

function App() {
  const [isFeedbackButton, setIsFeedbackButton] = useState(false);
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const [isCreateBean, setIsCreateBean] = useState(false);
  const [isSideBar, setisSideBar] = useState(false);
  const location = useGeoLocation();
  const socketurl = process.env.REACT_APP_SOCKET_URL
    ? process.env.REACT_APP_SOCKET_URL
    : "";
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl, {
    shouldReconnect: (closeEvent) => {
      // console.log("소켓 재 연결중...");
      return true;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data[0] == "{") {
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
        // console.log(beanList);
      }
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(
    (bean: string) => sendMessage(bean),
    []
  );

  return (
    <div className="App">
      <div className="create-button">
        <img
          className="create-button-img"
          onClick={() => setIsCreateBean(true)}
          src={createButton}
          alt="chat-button"
        />
      </div>
      <div className="feedback-button">
        <img
          className="feedback-button-img"
          onClick={() => setIsFeedbackButton(true)}
          src={FeedbackButtonImg}
          alt="feedback-button"
        />
      </div>
      {isFeedbackButton && (
        <FeedbackButton setIsFeedbackButton={setIsFeedbackButton} />
      )}

      {/* <div style={{ position: "absolute", zIndex: 100 }}>
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
        <div>{beanList ? JSON.stringify(beanList) : ""}</div>
        <div>{readyState}</div>
      </div> */}
      {isCreateBean && (
        <CreateBean
          sendMessage={sendMessage}
          setIsCreateBean={setIsCreateBean}
          latitude={location.coordinates.lat}
          longitude={location.coordinates.lng}
        />
      )}
      {location.loaded && <KakaoMap />}
      <Sidebar isSideBar={isSideBar} setisSideBar={setisSideBar} />
    </div>
  );
}

export default App;
