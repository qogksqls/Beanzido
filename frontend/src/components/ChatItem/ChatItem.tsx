import React, { useEffect, useRef, useState, memo } from "react";
import { useRecoilState } from "recoil";
import ReactTooltip from "react-tooltip";
import { mapCenterState } from "store/atom";
import { ColoredBean } from "store/types";
import useTime from "components/hooks/useTime";
import "./ChatItem.scss";

import ExpandImg from "components/ExpandImg/ExpandImg";
import locationImg from "assets/img/location.svg";
import filtered from "assets/img/filtered.png";

type ChatProps = {
  Chatinfo: ColoredBean;
};

function ChatItem({ Chatinfo }: ChatProps) {
  // const [targetPosition, SetTargetPosition] = useTargetLocation();
  const [, setMapCenter] = useRecoilState(mapCenterState);
  const [elapsedText] = useTime(Chatinfo.createdAt);
  const [expandImg, setExpandImg] = useState(false);

  return (
    <>
      <div
        className="chat-item"
        onClick={() => {
          setMapCenter({
            lat: Chatinfo.latitude,
            lng: Chatinfo.longitude,
            loaded: true,
            isPanto: true,
          });
        }}
        data-for="chat-item"
        data-tip
      >
        <ReactTooltip
          id="chat-item"
          className="chat-item-tooltip"
          getContent={(dataTip) => "위치로 이동"}
          type="success"
          place="top"
          // effect="solid"
          delayShow={200}
        />
        <div
          className="nickname-container"
          style={{
            color: Chatinfo.color.color,
            backgroundColor: Chatinfo.color.backgroundColor,
          }}
        >
          {Chatinfo.nickname[0]}
        </div>
        <div className="contents-container">
          <div className="up">
            <div className="nickname">{Chatinfo.nickname}</div>
            <div className="time">{elapsedText}</div>
          </div>
          <div className="location">
            <img src={locationImg} className="location-img" alt="" />
            {Chatinfo.location}
          </div>
          {Chatinfo.content === "" ? (
            <div></div>
          ) : (
            <div className="down">
              <div style={{ whiteSpace: "pre-line" }}>
                {Chatinfo.contentFilter
                  ? "부적절한 단어가 포함되어 있습니다."
                  : Chatinfo.content.replaceAll("<br/>", "\r\n")}
              </div>
            </div>
          )}
          <div className="chat-item-img">
            <img
              src={Chatinfo.imgFilter ? filtered : Chatinfo.img}
              className="chat-item-img-off"
              onClick={() => setExpandImg(!expandImg)}
              alt=""
            />
          </div>
        </div>
      </div>
      {expandImg && (
        <ExpandImg photo={Chatinfo.img} setExpandImg={setExpandImg} />
      )}
    </>
  );
}

export default memo(ChatItem);
