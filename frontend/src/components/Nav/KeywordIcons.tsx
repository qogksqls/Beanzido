import React from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Lottie from "lottie-react";
import cycle from "assets/img/cycling.json";
import bus from "assets/img/bus.json";
import train from "assets/img/train.json";
import "./Nav.scss";

const KeywordIcons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div
        className="switch si-do"
        onClick={() => navigate("/keyword")}
        data-for="si-do"
        data-tip
      >
        <Lottie animationData={train} className="ani-img pin" />
        <ReactTooltip
          id="si-do"
          getContent={(dataTip) => "시/도"}
          place="right"
          effect="solid"
        />
      </div>
      <div
        className="switch goon-goo"
        onClick={() => navigate("/keyword")}
        data-for="goon-goo"
        data-tip
      >
        <Lottie animationData={bus} className="ani-img pin" />
        <ReactTooltip
          id="goon-goo"
          getContent={(dataTip) => "시/군/구"}
          place="right"
          effect="solid"
        />
      </div>
      <div
        className="switch dong"
        onClick={() => navigate("/keyword")}
        data-for="dong"
        data-tip
      >
        <Lottie animationData={cycle} className="ani-img pin" />
        <ReactTooltip
          id="dong"
          getContent={(dataTip) => "읍/면/동"}
          place="right"
          effect="solid"
        />
      </div>
    </div>
  );
};

export default KeywordIcons;
