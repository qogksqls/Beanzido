import { useRecoilValue } from "recoil";
import { colorSelector } from "store/selector";
import { useNavigate, useLocation } from "react-router-dom";
import { Polygon } from "react-kakao-maps-sdk";
import { isMobile } from "react-device-detect";
import { CSSTransition } from "react-transition-group";
import { LngLat } from "store/types";
import { useEffect, useState } from "react";
import KeywordTooltip from "./KeywordTooltip";
import KeywordModal from "./KeywordModal/KeywordModal";
import ModalPortal from "Portal";

type PolyProps = {
  polygon: LngLat[][];
  keywords: { [keyword: string]: number };
  name: string;
  map: kakao.maps.Map;
  code: string;
};

function KeywordPoly({ polygon, keywords, name, code, map }: PolyProps) {
  const navigate = useNavigate();
  const { backgroundColor } = useRecoilValue(colorSelector);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [isMobileKeyword, setIsMobileKeyword] = useState(false);

  const mouseHandler = {
    onClick: () => {
      kakao.maps.event.preventMap();
      if (code.length === 2) {
        navigate("/keyword/si/" + code);
      } else if (code.length === 5) {
        navigate("/keyword/dong/" + code);
      }
    },
    onMouseover: (target: kakao.maps.Polygon) => {
      target.setOptions({ fillColor: backgroundColor });
    },
    onMouseout: (target: kakao.maps.Polygon) => {
      target.setOptions({ fillColor: "#f5f5f5" });
      setMousePosition({
        lat: 0,
        lng: 0,
      });
    },
    onMousemove: (
      _map: kakao.maps.Polygon,
      mouseEvent: kakao.maps.event.MouseEvent
    ) => {
      setMousePosition({
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      });
    },
  };

  const tapHandler = {
    onClick: () => {
      kakao.maps.event.preventMap();

      if (isMobileKeyword) {
        if (code.length === 2) {
          navigate("/keyword/si/" + code);
        } else if (code.length === 5) {
          navigate("/keyword/dong/" + code);
        }
      } else {
        setIsMobileKeyword(true);
        setTimeout(() => setIsMobileKeyword(false), 3000);
      }
    },
  };

  return (
    <>
      <Polygon
        path={polygon}
        strokeWeight={1}
        strokeColor={"#000000"}
        strokeOpacity={0.6}
        strokeStyle={"solid"}
        fillColor={"#f5f5f5"}
        fillOpacity={0.9}
        {...(isMobile ? tapHandler : mouseHandler)}
      />
      <KeywordTooltip
        mousePosition={mousePosition}
        name={name}
        keywords={keywords}
      />
      <ModalPortal>
        <CSSTransition
          classNames={"transition"}
          in={isMobileKeyword}
          timeout={500}
          unmountOnExit
        >
          <KeywordModal name={name} keywords={keywords} />
        </CSSTransition>
      </ModalPortal>
    </>
  );
}

export default KeywordPoly;
