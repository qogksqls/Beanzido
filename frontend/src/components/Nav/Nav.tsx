import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState, mapCenterState } from "store/atom";
import ReactTooltip from "react-tooltip";
import CommunityIcons from "./CommunityIcons";
import KeywordIcons from "./KeywordIcons";

import "./Nav.scss";
// import createButton from "assets/img/chat-button.svg";
import { ReactComponent as CreateButton } from "assets/img/chat-button.svg";
import openIcon from "assets/img/Expand_right_light.svg";
import Lottie from "lottie-react";
import aroundTheWorld from "assets/img/around-the-world.json";
import bubbleChat from "assets/img/bubble-chat.json";
import likeAni from "assets/img/like.json";
import searchAni from "assets/img/search.json";
import cycle from "assets/img/cycling.json";
import bus from "assets/img/bus.json";
import train from "assets/img/train.json";
import logo from "assets/img/Logo.svg";
import { ReactComponent as BottomBridge } from "assets/img/bottom-bar.svg";
import useGeolocation from "components/hooks/useGeolocation";

export default function Nav() {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const [isKeyword, setIsKeyword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [, setMapCenter] = useRecoilState(mapCenterState);
  const { coordinates } = useGeolocation();

  return (
    <nav>
      <div className="bottom-bar">
        {location.pathname.slice(0, 8) !== "/keyword" ? (
          <div
            className="button-container"
            onClick={() => navigate("/sidebar")}
          >
            <Lottie animationData={bubbleChat} className="ani-img bubleChat" />
          </div>
        ) : (
          <div
            className="button-container"
            onClick={() => {
              const locationPath = location.pathname.split("/");
              if (locationPath.length === 4 && locationPath[2] === "dong") {
                navigate(`/keyword/si/${locationPath[3].slice(0, 2)}`);
              } else {
                navigate("/keyword");
              }
            }}
          >
            {location.pathname.split("/").length === 4 ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                {location.pathname.split("/")[2] === "dong" ? (
                  <Lottie animationData={cycle} className="ani-img pin" />
                ) : (
                  <Lottie animationData={bus} className="ani-img pin" />
                )}
              </div>
            ) : (
              <Lottie animationData={train} className="ani-img pin" />
            )}
          </div>
        )}
        <BottomBridge className="barImage" />
        <div
          className="button-container"
          onClick={() => {
            navigate(isKeyword ? "/" : "/keyword");
            setIsKeyword(!isKeyword);
          }}
        >
          <Lottie
            animationData={isKeyword ? aroundTheWorld : searchAni}
            className={
              isKeyword ? "ani-img aroundTheWorld" : "ani-img searchAni"
            }
          />
        </div>
      </div>
      <div
        className={
          location.pathname.slice(0, 8) !== "/keyword" ? "handle" : "handle-off"
        }
        onClick={() => {
          navigate("/sidebar");
        }}
      >
        <img src={openIcon} alt="open" />
      </div>
      <div className="create-button">
        <CreateButton
          className="create-button-img"
          onClick={() => navigate("/create")}
          width="34"
          height="34"
          viewBox="3 3 18 18"
        />
      </div>
      <div className="sidebar-fix">
        <div className="side-logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              alert("Beanzido is World Best Social Map Community.");
            }}
          />
        </div>
        <div
          className={
            location.pathname === "/sidebar"
              ? sidebar === 0
                ? "switch-container first"
                : "switch-container second"
              : "switch-container"
          }
        >
          <div
            className="switch"
            data-for={
              location.pathname.slice(0, 8) !== "/keyword"
                ? "community"
                : "keyword"
            }
            data-tip
          >
            <Lottie
              animationData={
                location.pathname.slice(0, 8) !== "/keyword"
                  ? searchAni
                  : aroundTheWorld
              }
              className={
                location.pathname.slice(0, 8) !== "/keyword"
                  ? "ani-img searchAni"
                  : "ani-img aroundTheWorld"
              }
              onClick={() => {
                navigate(
                  location.pathname.slice(0, 8) !== "/keyword"
                    ? "/keyword"
                    : "/"
                );
                setMapCenter({
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                  loaded: true,
                  isPanto: true,
                });
              }}
            />
          </div>
          {location.pathname.slice(0, 8) === "/keyword" ? (
            <ReactTooltip
              id="keyword"
              getContent={(dataTip) => "커뮤니티 보기"}
              place="right"
              effect="solid"
            />
          ) : (
            <ReactTooltip
              id="keyword"
              getContent={(dataTip) => "지역별 키워드 보기"}
              place="right"
              effect="solid"
            />
          )}
          {location.pathname.slice(0, 8) === "/keyword" ? (
            <KeywordIcons />
          ) : (
            <CommunityIcons />
          )}
        </div>
        {location.pathname !== "/feedback" && (
          <div
            className="feedback-button"
            onClick={() => navigate("/feedback")}
            data-for="feedback-btn"
            data-tip
          >
            <Lottie className="feedback-button-img" animationData={likeAni} />
          </div>
        )}
        <ReactTooltip
          id="feedback-btn"
          getContent={(dataTip) => "피드백"}
          place="right"
          effect="solid"
        />
      </div>
    </nav>
  );
}
