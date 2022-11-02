import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { beanListState } from "store/atom";
import { Outlet } from "react-router-dom";
import "./Main.scss";
import openIcon from "assets/img/Expand_right_light.svg";

import createButton from "assets/img/chat-button.svg";
import FeedbackButtonGif from "assets/img/FeedbackButton.gif";
import FeedbackButtonImg from "assets/img/FeedbackButton.png";

function Main() {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <div className="create-button">
        <img
          className="create-button-img"
          onClick={() => navigate("/create")}
          src={createButton}
          alt="chat-button"
        />
      </div>
      <div className="feedback-button">
        <img
          className="feedback-button-img"
          onClick={() => navigate("/feedback")}
          src={FeedbackButtonGif}
          alt=""
        />
        <img
          className="feedback-button-img"
          onClick={() => navigate("/feedback")}
          src={FeedbackButtonImg}
          alt="feedback-button"
        />
      </div>
      <div className="handle" onClick={() => navigate("/sidebar")}>
        <img src={openIcon} alt="open" />
      </div>
    </>
  );
}

export default Main;
