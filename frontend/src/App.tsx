import { useState } from "react";
import { RecoilRoot } from "recoil";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useGeoLocation from "components/hooks/useGeolocation";
import CreateBean from "./components/CreateBean/CreateBean"
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
    <RecoilRoot>
    <div className="App">
      <img
        className="create-button"
        onClick={OpenCreateBean}
        src={createButton}
        alt="chat-button" />
      {openCreateBean && <CreateBean CloseCreateBean={CloseCreateBean} />}
      <KakaoMap MyPosition={location.coordinates}></KakaoMap>
    </div>
    </RecoilRoot>
  );
}

export default App;
