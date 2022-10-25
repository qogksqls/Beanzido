import { useEffect, useState } from "react";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useGeoLocation from "assets/hooks/useGeolocation";
import CreateBean from "./components/CreateBean/CreateBean"

import createButton from "./assets/img/chat-button.svg"
import Sidebar from "components/Sidebar/Sidebar";

function App() {
  const location = useGeoLocation();
  const [openCreateBean, setOpenCreateBean] = useState(false)
  const BeanList = [
    {
      Position: location.coordinates,
      nickname: "괜찮은 황태희",
      contents:
        "안녕하세요 이게 되는지 잘 모르겠네요 이거는 20줄까지는 하고 싶은데",
      color: "red",
      img: "",
      createdAt: Date(),
    },
  ];

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
      <KakaoMap BeanList={BeanList} MyPosition={location.coordinates} />
      <Sidebar BeanList={BeanList}/>
    </div>
  );
}

export default App;
