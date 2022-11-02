import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { beanListState } from "store/atom";
import "./App.scss";
import useWebSocket from "react-use-websocket";
import useBeanAPI from "components/hooks/useBeanAPI";
import useGeoLocation from "components/hooks/useGeolocation";
import Main from "components/Main/Main";
import CreateBean from "components/CreateBean/CreateBean";
import FeedbackButton from "components/FeedbackButton/FeedbackButton";
import Sidebar from "components/Sidebar/Sidebar";
import KakaoMap from "components/KakaoMap";
import Logo from "assets/img/Logo.svg";

function App() {
  const beanAPI = useBeanAPI();
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const socketurl = process.env.REACT_APP_SOCKET_URL
    ? process.env.REACT_APP_SOCKET_URL
    : "";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketurl, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });
  const location = useLocation();
  const { loaded } = useGeoLocation();

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data[0] == "{") {
        setBeanList([...beanList, JSON.parse(lastMessage.data)]);
      }
    }
  }, [lastMessage]);

  return (
    <div className="App">
      {loaded && <KakaoMap />}
      <div className="logo">
        <img src={Logo} alt="로고" />
      </div>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="transition" timeout={500}>
          <Routes location={location}>
            <Route path="/" element={<Main />}>
              <Route path="sidebar" element={<Sidebar />} />
              <Route
                path="create"
                element={<CreateBean sendMessage={sendMessage} />}
              />
              <Route path="feedback" element={<FeedbackButton />} />
            </Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
