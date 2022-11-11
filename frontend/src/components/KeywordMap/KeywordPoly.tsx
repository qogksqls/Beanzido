import { useRecoilValue } from "recoil";
import { colorSelector } from "store/selector";
import { useNavigate, useLocation } from "react-router-dom";
import { Polygon } from "react-kakao-maps-sdk";
import { LngLat } from "store/types";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import KeywordTooltip from "./KeywordTooltip";

type PolyProps = {
  polygon: LngLat[][];
  keyword: string;
  name: string;
  map: kakao.maps.Map;
  code: string;
};

function KeywordPoly({ polygon, keyword, name, code, map }: PolyProps) {
  const navigate = useNavigate();
  const { backgroundColor } = useRecoilValue(colorSelector);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });

  return (
    <div>
      <Polygon
        path={polygon}
        strokeWeight={1}
        strokeColor={"#000000"}
        strokeOpacity={0.6}
        strokeStyle={"solid"}
        fillColor={"#f5f5f5"}
        fillOpacity={0.9}
        onClick={(t, e) => {
          kakao.maps.event.preventMap();
          if (code.length === 2) {
            navigate("/keyword/si/" + code);
          } else if (code.length === 5) {
            navigate("/keyword/dong/" + code);
          }
        }}
        onMouseover={(target, mouseEvent) => {
          target.setOptions({ fillColor: backgroundColor });
          console.log(name);
        }}
        onMouseout={(target) => {
          target.setOptions({ fillColor: "#f5f5f5" });
          setMousePosition({
            lat: 0,
            lng: 0,
          });
        }}
        onMousemove={(_map, mouseEvent) =>
          setMousePosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      />
      <KeywordTooltip
        mousePosition={mousePosition}
        name={name}
        keyword={keyword}
      />
    </div>
  );
}

export default KeywordPoly;
