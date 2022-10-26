import { useState } from "react";
import { RecoilRoot } from "recoil";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useGeoLocation from "components/hooks/useGeolocation";
import CreateBean from "./components/CreateBean/CreateBean"
import FeedbackBean from "components/FeedbackBean/FeedbackBean";
import createButton from "./assets/img/chat-button.svg"
import Sidebar from "components/Sidebar/Sidebar";

function App() {
  const location = useGeoLocation();
  const [isCreateBean, setIsCreateBean] = useState(false)
  const [isSideBar, setisSideBar] = useState(true)

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

  return (
    <RecoilRoot>
    <div className="App">
      <img
        className="create-button"
        onClick={() => setIsCreateBean(true)}
        src={createButton}
        alt="chat-button" />
      {openCreateBean && <CreateBean CloseCreateBean={CloseCreateBean} />}
      <KakaoMap MyPosition={location.coordinates}></KakaoMap>
      <FeedbackBean />
    </div>
    </RecoilRoot>
  );
}

export default App;
