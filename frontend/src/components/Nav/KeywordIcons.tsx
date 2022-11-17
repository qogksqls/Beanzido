import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { constSelector, useRecoilState } from "recoil";
import { mapCenterState, sidebarState, isKeywordRankState } from "store/atom";
import useGeolocation from "components/hooks/useGeolocation";
import aroundTheWorld from "assets/img/around-the-world.json";
import cycle from "assets/img/cycling.json";
import bus from "assets/img/bus.json";
import train from "assets/img/train.json";
import "./Nav.scss";
import { SetStateAction, useEffect } from "react";
import { ReactComponent as BusIcon } from "assets/img/bus.svg";
import { ReactComponent as CycleIcon } from "assets/img/cycle.svg";

const KeywordIcons = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const navigate = useNavigate();
  const location = useLocation();
  const [isKeywordRank, setIsKeywordRank] = useRecoilState(isKeywordRankState);
  const [, setMapCenter] = useRecoilState(mapCenterState);
  const { coordinates } = useGeolocation();

  console.log(sidebar, isKeywordRank);
  useEffect(() => {
    if (location.pathname.split("/").length === 4) {
      if (location.pathname.split("/")[2] === "dong") {
        setSidebar(3);
      } else {
        setSidebar(2);
      }
    } else {
      setSidebar(1);
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className="switch"
        onClick={() => {
          navigate("/");
          setIsKeywordRank(false);
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
        className={"switch " + (sidebar === 1 && isKeywordRank ? "active" : "")}
        onClick={() => {
          setIsKeywordRank(true);
          navigate("/keyword");
        }}
        data-for="si-do"
        data-tip
      >
        <Lottie animationData={train} className="ani-img pin" />
      </div>
      <div
        className={"switch " + (sidebar === 2 && isKeywordRank ? "active" : "")}
        onClick={() => {
          if (location.pathname.split("/").length === 4) {
            setIsKeywordRank(true);
            navigate(
              `/keyword/si/${location.pathname.split("/")[3].slice(0, 2)}`
            );
          }
        }}
        data-for="goon-goo"
        data-tip
      >
        {location.pathname.split("/").length === 4 ? (
          <div>
            <Lottie animationData={bus} className="ani-img pin" />
          </div>
        ) : (
          <div className="static" style={{ width: "100%" }}>
            <BusIcon className="bus-icon" />
          </div>
        )}
      </div>
      <div
        className={"switch " + (sidebar === 3 && isKeywordRank ? "active" : "")}
        onClick={() => {
          if (location.pathname.split("/").length === 4) {
            setIsKeywordRank(true);
          }
        }}
        data-for="dong"
        data-tip
      >
        {location.pathname.split("/").length === 4 ? (
          <div>
            {location.pathname.split("/")[2] === "dong" ? (
              <div>
                <Lottie animationData={cycle} className="ani-img pin" />
              </div>
            ) : (
              <div className="static" style={{ width: "100%" }}>
                <CycleIcon className="cycle-icon" />
              </div>
            )}
          </div>
        ) : (
          <div className="static" style={{ width: "100%" }}>
            <CycleIcon className="cycle-icon" />
          </div>
        )}
      </div>
    </>
  );
};

export default KeywordIcons;
