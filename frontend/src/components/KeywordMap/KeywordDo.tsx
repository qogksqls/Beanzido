import { useEffect } from "react";
import useKeyword from "components/hooks/useKeyword";
import KeywordPoly from "./KeywordPoly";

type KeywordProps = {
  map: kakao.maps.Map;
};

function KeywordDo({ map }: KeywordProps) {
  const { keyRes, isKeyLoad } = useKeyword("/do");
  useEffect(() => {
    const sw = new kakao.maps.LatLng(33.17261058239259, 124.7893154389517);
    const ne = new kakao.maps.LatLng(38.54261253850525, 130.96325546758288);

    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    map.panTo(bounds);
  }, []);

  return (
    <div>
      {isKeyLoad && (
        <>
          {keyRes.map(([code, { polygon, keyword }]) => (
            <KeywordPoly
              polygon={polygon}
              keyword={keyword}
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
