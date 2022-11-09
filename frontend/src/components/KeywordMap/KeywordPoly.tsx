import { useRecoilValue } from "recoil";
import { colorSelector } from "store/selector";
import { useNavigate, useLocation } from "react-router-dom";
import { Polygon } from "react-kakao-maps-sdk";
import { LngLat } from "store/types";

type PolyProps = {
  polygon: LngLat[][];
  keyword: string;
  map: kakao.maps.Map;
  code: string;
};

function KeywordPoly({ polygon, keyword, code, map }: PolyProps) {
  const navigate = useNavigate();
  const { backgroundColor } = useRecoilValue(colorSelector);

  return (
    <div>
      <Polygon
        path={polygon}
        strokeWeight={1}
        strokeColor={"#000000"}
        strokeOpacity={0.6}
        strokeStyle={"solid"}
        fillColor={"#f5f5f5"}
        fillOpacity={0.5}
        onClick={(t, e) => {
          kakao.maps.event.preventMap();
          if (code.length === 2) {
            navigate("/keyword/si/" + code);
          } else if (code.length === 5) {
            navigate("/keyword/dong/" + code);
          }
        }}
        onMouseover={(target) => {
          target.setOptions({ fillColor: backgroundColor });
          console.log(keyword);
        }}
        onMouseout={(target) => target.setOptions({ fillColor: "#f5f5f5" })}
      />
    </div>
  );
}

export default KeywordPoly;
