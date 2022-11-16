import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CSSTransition } from "react-transition-group";
import { mapLevelState, mapCenterState } from "store/atom";
import NavToolTip from "./NavToolTip";
import CommunityIcons from "./CommunityIcons";
import KeywordIcons from "./KeywordIcons";
import SidebarKeyword from "components/Sidebar/SidebarKeyword";
import KeywordButton from "./KeywordButton";
import "./Nav.scss";
import { ReactComponent as CreateSVG } from "assets/img/chat-button.svg";
import { ReactComponent as BottomBridge } from "assets/img/bottom-bar.svg";
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

export default function Nav() {
  const [, setLevel] = useRecoilState(mapLevelState);
  const [isKeyword, setIsKeyword] = useState(false);
  const keywordRef = useRef(null);
  const communityRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isKeywordRank, setIsKeywordRank] = useState(true);

  useEffect(() => {
    if (location.pathname.slice(0, 8) === "/keyword") {
      setIsKeyword(true);
      setIsKeywordRank(true);
    } else {
      setIsKeyword(false);
      setIsKeywordRank(false);
    }
  }, [location.pathname]);

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
          location.pathname.slice(0, 8) !== "/keyword"
            ? "handle"
            : "handle-keyword"
        }
        onClick={() => {
          // eslint-disable-next-line no-lone-blocks
          {
            location.pathname.slice(0, 8) !== "/keyword"
              ? navigate("/sidebar")
              : setIsKeywordRank(true);
          }
        }}
      >
        <img src={openIcon} alt="open" />
      </div>
      {isKeywordRank && <SidebarKeyword setIsKeywordRank={setIsKeywordRank} />}
      {isKeyword ? (
        <KeywordButton />
      ) : (
        <div className="create-button" onClick={() => navigate("/create")}>
          <CreateSVG width="34" height="34" viewBox="3 3 18 18" />
        </div>
      )}
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
        <div className="side-container">
          <CSSTransition
            in={isKeyword}
            nodeRef={keywordRef}
            classNames="transition"
            timeout={500}
          >
            <div className={"switch-container"} ref={keywordRef}>
              <KeywordIcons setIsKeywordRank={setIsKeywordRank} />
            </div>
          </CSSTransition>
          <CSSTransition
            in={!isKeyword}
            nodeRef={communityRef}
            classNames="transition"
            timeout={500}
          >
            <div className={"switch-container"} ref={communityRef}>
              <CommunityIcons />
            </div>
          </CSSTransition>
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
      </div>
      <NavToolTip />
    </nav>
  );
}
