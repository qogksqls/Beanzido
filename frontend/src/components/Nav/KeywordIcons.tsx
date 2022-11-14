import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { useRecoilState } from "recoil";
import { mapCenterState, sidebarState, mapLevelState } from "store/atom";
import useGeolocation from "components/hooks/useGeolocation";
import aroundTheWorld from "assets/img/around-the-world.json";
import cycle from "assets/img/cycling.json";
import bus from "assets/img/bus.json";
import train from "assets/img/train.json";
import "./Nav.scss";

const KeywordIcons = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const [, setLevel] = useRecoilState(mapLevelState);
  const navigate = useNavigate();

  const [, setMapCenter] = useRecoilState(mapCenterState);
  const { coordinates } = useGeolocation();
  return (
    <>
      <div
        className="switch"
        onClick={() => {
          navigate("/");
          setMapCenter({
            lat: coordinates.lat,
            lng: coordinates.lng,
            loaded: true,
            isPanto: true,
          });
          setSidebar(0);
        }}
        data-for={"community"}
        data-tip
      >
        <Lottie
          animationData={aroundTheWorld}
          className={"ani-img aroundTheWorld"}
        />
      </div>
      <div
        className={"switch " + (sidebar === 1 ? "active" : "")}
        onClick={() => {
          navigate("/keyword");
          setSidebar(1);
        }}
        data-for="si-do"
        data-tip
      >
        <Lottie animationData={train} className="ani-img pin" />
      </div>
      <div
        className={"switch " + (sidebar === 2 ? "active" : "")}
        onClick={() => {
          navigate("/keyword");
          setSidebar(2);
        }}
        data-for="goon-goo"
        data-tip
      >
        <Lottie animationData={bus} className="ani-img pin" />
      </div>
      <div
        className={"switch " + (sidebar === 3 ? "active" : "")}
        onClick={() => {
          navigate("/keyword");
          setSidebar(3);
        }}
        data-for="dong"
        data-tip
      >
        <Lottie animationData={cycle} className="ani-img pin" />
      </div>
    </>
  );
};

export default KeywordIcons;
