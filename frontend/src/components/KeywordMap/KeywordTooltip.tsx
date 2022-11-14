import React, { useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import "./KeywordTooltip.scss";
import locationImg from "assets/img/location.svg";

type PositionProps = {
  mousePosition: { lat: number; lng: number };
  name: string;
  keyword: string;
};

const KeywordTooltip = ({ mousePosition, name, keyword }: PositionProps) => {
  console.log(name);

  return (
    <div>
      <CustomOverlayMap position={mousePosition}>
        <div className="keyword-overlay">
          <div className="keyword-header">
            <img src={locationImg} className="location-img" alt="" />
            <div className="keyword-location">{name}</div>
            <div style={{ fontSize: "6px" }}>의 실시간 키워드입니다.</div>
          </div>
          {keyword ? (
            <div className="keyword">{keyword}</div>
          ) : (
            <div className="keyword">이 지역은 콩이 하나도 없습니다.ㅠ^ㅠ</div>
          )}
        </div>
      </CustomOverlayMap>
    </div>
  );
};

export default KeywordTooltip;
