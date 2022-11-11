import { useEffect } from "react";
import useKeyword from "components/hooks/useKeyword";
import KeywordPoly from "./KeywordPoly";

type KeywordProps = {
  map: kakao.maps.Map;
};

function KeywordDo({ map }: KeywordProps) {
  const { keyRes, isKeyLoad } = useKeyword("/do");
  useEffect(() => {
    const sw = new kakao.maps.LatLng(33.4, 126);
    const ne = new kakao.maps.LatLng(37.9, 129.5);

    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    map.panTo(bounds, 0);
  }, []);

  return (
    <div>
      {isKeyLoad && (
        <>
          {keyRes.map(([code, { polygon, keyword, name }]) => (
            <KeywordPoly
              polygon={polygon}
              keyword={keyword}
              name={name}
              code={code}
              map={map}
              key={code}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default KeywordDo;
