import { useEffect } from "react";
// import KeywordPoly from "./KeywordPoly";
import { Outlet, useNavigate } from "react-router-dom";

type KeywordProps = {
  map: kakao.maps.Map;
};

function KeywordMap({ map }: KeywordProps) {
  const navigate = useNavigate();

  function idleCallback(mouseEvent: kakao.maps.event.MouseEvent) {
    const geocoder = new kakao.maps.services.Geocoder();
    const coords = mouseEvent.latLng;
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result) => {
      for (var i = 0; i < result.length; i++) {
        if (result[i].region_type === "B") {
          console.log(result[i].code);
          const level = map.getLevel();
          if (level <= 8) {
            navigate("dong/" + result[i].code.slice(0, 5));
          } else if (level <= 12) {
            navigate("si/" + result[i].code.slice(0, 2));
          } else {
            navigate("/keyword");
          }
        }
      }
    });
  }

  useEffect(() => {
    kakao.maps.event.addListener(map, "click", idleCallback);
    return () => {
      kakao.maps.event.removeListener(map, "click", idleCallback);
    };
  });
  return <Outlet />;
}

export default KeywordMap;
