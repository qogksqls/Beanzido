import React, { useState } from "react";
import "./Feedback.scss";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

type BeanProps = {
  nickname: string;
  contents: string;
  color: string;
  img?: string;
  createdAt: string;
  Position: {
    lat: number;
    lng: number;
  };
};

function Bean({
  nickname,
  contents,
  color,
  img,
  createdAt,
  Position,
}: BeanProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CustomOverlayMap position={Position}>
      <div className="Bean">
        <div className="nickname-container" style={{ backgroundColor: color }}>
          {nickname[0]}
        </div>
        <div className="contents-container">
          <div className="up">
            <div>{nickname}</div>
            <div className="time">just now</div>
            </div>
          <div className="down">{contents}</div>
        </div>
        <div className=""></div>
      </div>
    </CustomOverlayMap>
  );
}

export default Bean;
