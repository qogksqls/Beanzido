import { useEffect, useState } from "react";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useGeoLocation from "assets/hooks/useGeolocation";
import CreateBean from "./components/CreateBean/CreateBean"
import FeedbackBean from "components/FeedbackBean/FeedbackBean";
import createButton from "./assets/img/chat-button.svg"

function App() {
  const location = useGeoLocation();
  const [openCreateBean, setOpenCreateBean] = useState(false)

  function OpenCreateBean() {
    setOpenCreateBean(true)
  }
  function CloseCreateBean() {
    setOpenCreateBean(false);
  }

  return (
    <div className="App">
      <img
        className="create-button"
        onClick={OpenCreateBean}
        src={createButton}
        alt="chat-button" />
      {openCreateBean && <CreateBean CloseCreateBean={CloseCreateBean} />}
      <KakaoMap MyPosition={location.coordinates}></KakaoMap>
      <FeedbackBean />
    </div>
  );
}

export default App;
