import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useKeyword from "components/hooks/useKeyword";
import KeywordPoly from "./KeywordPoly";

type KeywordProps = {
  map: kakao.maps.Map;
};

function KeywordSi({ map }: KeywordProps) {
  const { siCode } = useParams();
  const { keyRes, isKeyLoad } = useKeyword(siCode ? "/si/" + siCode : "");

  useEffect(() => {
    if (isKeyLoad) {
      const bounds = new kakao.maps.LatLngBounds();
      keyRes.forEach((element) => {
        element[1].polygon.forEach((area) =>
          area.forEach(({ lng, lat }) => {
            const lnglat = new kakao.maps.LatLng(lat, lng);
            bounds.extend(lnglat);
          })
        );
      });
      map.panTo(bounds);
    }
  }, [isKeyLoad]);

  return (
    <div>
      {isKeyLoad && (
        <>
          {keyRes.map(([code, { polygon, keywords, name }]) => (
            <KeywordPoly
              polygon={polygon}
              keywords={keywords}
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
export default KeywordSi;
