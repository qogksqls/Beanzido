import React, { useState } from "react";
import "./IntroModal.scss";
import introBase from "assets/intro/intro_base.png";
import { ReactComponent as Iphone } from "assets/intro/iphone.svg";
import { ReactComponent as Mac } from "assets/intro/macbook.svg";
import { ReactComponent as Pixel } from "assets/intro/pixel6.svg";
import { ReactComponent as Search } from "assets/intro/search_beanzido.svg";
import { ReactComponent as Logo } from "assets/img/Logo.svg";

type IntroModalProps = {
  setIsIntro: React.Dispatch<React.SetStateAction<boolean>>;
};

function IntroModal({ setIsIntro }: IntroModalProps) {
  const [frame, setFrame] = useState(0);
  return (
    <>
      <div className="intro-modal">
        <img
          src={introBase}
          className="intro-base"
          alt="intro"
          onClick={() => setIsIntro(false)}
        />
        <div className="intro-wrapper">
          {frame === 3 && (
            <div className="frame_3">
              <Iphone className="intro-img iphone" />
              <Search
                className="intro-img search-beanzido"
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.beanzido.twa"
                  );
                }}
              />
              <span className="footer">
                Beanzido A206 김우창 배한빈 안현모 이경무 이준경 황태희
              </span>
            </div>
          )}
          {frame === 2 && (
            <div className="frame_2">
              <Pixel className="intro-img pixel" />
            </div>
          )}
          {frame === 1 && (
            <div className="frame_1">
              <Mac className="intro-img macbook" />
            </div>
          )}
          {frame === 0 && (
            <div className="frame_0">
              <Logo className="intro-img intro-logo" />
            </div>
          )}
          {frame < 3 && (
            <div className="front" onClick={() => setFrame(frame + 1)} />
          )}
          {frame > 0 && (
            <div className="back" onClick={() => setFrame(frame - 1)} />
          )}
        </div>
      </div>
      <div className="intro-modal-back" onClick={() => setIsIntro(false)} />
    </>
  );
}

export default IntroModal;
