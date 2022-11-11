import { useState, useEffect } from "react";
import axios from "axios";
import { LngLat } from "store/types";

type PolyRes = number[][][];
type Polygon = LngLat[][];
type ResData = { string: { polygon: PolyRes; keyword: string } };

export default function useKeyword(target: string) {
  const Url = process.env.REACT_APP_SEND_URL;
  const [isKeyLoad, setIsKeyLoad] = useState(false);
  const [keyRes, setKeyRes] = useState(
    <[string, { polygon: Polygon; keyword: string }][]>[]
  );
  useEffect(() => {
    if (target) {
      setIsKeyLoad(false);
      setKeyRes([]);
      const baseUrl = `https://${Url}/keyword-server`;
      const keywordUrl = baseUrl + target;
      axios.get<ResData>(keywordUrl).then(({ data }) => {
        setKeyRes(
          [...Object.entries(data)].map(([code, { polygon, keyword }]) => {
            const newPoly = polygon.map((area) => {
              return area.map((lnglat) => {
                return { lng: lnglat[0], lat: lnglat[1] };
              });
            });
            return [code, { polygon: newPoly, keyword }];
          })
        );
        setIsKeyLoad(true);
      });
    }
  }, [target]);

  return { keyRes, isKeyLoad };
}
