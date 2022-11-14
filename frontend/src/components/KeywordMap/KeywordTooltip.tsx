import React, { useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import "./KeywordTooltip.scss";
import locationImg from "assets/img/location.svg";
import _ from "lodash";

type PositionProps = {
  mousePosition: { lat: number; lng: number };
  name: string;
  keywords: { [keyword: string]: number };
};

const KeywordTooltip = ({ mousePosition, name, keywords }: PositionProps) => {
  // console.log(keywords);

  return (
    <div>
      <CustomOverlayMap position={mousePosition}>
        <div className="keyword-overlay">
          <div className="keyword-header">
            <img src={locationImg} className="location-img" alt="" />
            <div className="keyword-location">{name}</div>
            <div style={{ fontSize: "6px" }}>의 실시간 키워드입니다.</div>
          </div>
          {_.isEmpty(keywords) ? (
            <div className="keyword">이 지역은 콩이 하나도 없습니다.ㅠ^ㅠ</div>
          ) : (
            <div className="keyword">{Object.keys(keywords)[0]}</div>
          )}
        </div>
      </CustomOverlayMap>
    </div>
  );
};

export default KeywordTooltip;
