import { useState, useEffect, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useGeoLocation from "components/hooks/useGeolocation";
import useBeanAPI from "components/hooks/useBeanAPI";
import CreateBean from "./components/CreateBean/CreateBean";
import Sidebar from "components/Sidebar/Sidebar";
import Logo from "./assets/img/Logo.svg";
import createButton from "./assets/img/chat-button.svg";
import FeedbackButtonGif from "./assets/img/FeedbackButton.gif";
import FeedbackButtonImg from "./assets/img/FeedbackButton.png";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";

function App() {
  const [isFeedbackButton, setIsFeedbackButton] = useState(false);
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const [isCreateBean, setIsCreateBean] = useState(false);
  const [isSideBar, setisSideBar] = useState(true);
  const location = useGeoLocation();
  const socketurl = process.env.REACT_APP_SOCKET_URL
    ? process.env.REACT_APP_SOCKET_URL
    : "";
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl);

  const beanAPI = useBeanAPI();
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl, {
    shouldReconnect: (closeEvent) => {
      // console.log("소켓 재 연결중...");
      // console.log(readyState);
      return true;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data[0] == "{") {
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    setisSideBar(false);
  }, []);

  function clickFeedback() {
    const temp = document.getElementsByClassName("feedback-button");
    if (temp[0] === undefined) {
      window.open(
        "https://forms.gle/dbpsXhqdLRpbFnrT6",
        "_blank",
        "noopener,noreferrer"
      );
      document.getElementsByClassName("feedback-button-center")[0].className =
        "feedback-button";
    } else {
      temp[0].className = "feedback-button-center";
    }

    // setIsFeedbackButton(true);
  }

  return (
    <div className="App">
      <div className="logo">
        <img src={Logo} alt="로고" />
      </div>
      <div className="create-button">
        <img
          className="create-button-img"
          onClick={() => setIsCreateBean(true)}
          src={createButton}
          alt="chat-button"
        />
      </div>
      <div className="feedback-button" onClick={clickFeedback}>
        <img className="feedback-button-img" src={FeedbackButtonImg} alt="" />
        <img className="feedback-button-img" src={FeedbackButtonGif} alt="" />
        <div>클릭 시 피드백 페이지로 이동</div>
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
