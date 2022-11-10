import React from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "store/atom";
import Lottie from "lottie-react";
import pinAni from "assets/img/pin.json";
import bubbleChat from "assets/img/bubble-chat.json";
import ReactTooltip from "react-tooltip";
import "./Nav.scss";

const CommunityIcons = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="switch all"
        onClick={() => {
          if (location.pathname !== "/sidebar") {
            navigate("/sidebar");
          }
          setSidebar(0);
        }}
        data-for="all-bean"
        data-tip
      >
        <Lottie animationData={bubbleChat} className="ani-img bubbleChat" />
        <ReactTooltip
          id="all-bean"
          getContent={(dataTip) => "전체 콩"}
          place="right"
          effect="solid"
        />
      </div>
      <div
        className="switch focus"
        onClick={() => {
          if (location.pathname !== "/sidebar") {
            navigate("/sidebar");
          }
          setSidebar(1);
        }}
        data-for="one-bean"
        data-tip
      >
        <Lottie animationData={pinAni} className="ani-img pin" />
        <ReactTooltip
          id="one-bean"
          getContent={(dataTip) => "개별 콩"}
          place="right"
          effect="solid"
        />
      </div>
    </div>
  );
};

export default CommunityIcons;
