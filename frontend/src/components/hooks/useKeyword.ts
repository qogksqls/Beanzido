import { useState, useEffect } from "react";
import axios from "axios";
import { LngLat } from "store/types";

type PolyRes = number[][][];
type Polygon = LngLat[][];
type ResData = {
  property: {
    string: {
      polygon: PolyRes;
      keywords: { [keyword: string]: number };
      name: string;
    };
  };
  rank: { [keyword: string]: number };
};

export default function useKeyword(target: string) {
  const Url = process.env.REACT_APP_SEND_URL;
  const [isKeyLoad, setIsKeyLoad] = useState(false);
  const [keyRes, setKeyRes] = useState(
    [] as [
      string,
      {
        polygon: Polygon;
        keywords: { [keyword: string]: number };
        name: string;
      }
    ][]
  );
  useEffect(() => {
    if (target) {
      setIsKeyLoad(false);
      setKeyRes([]);
      const baseUrl = `https://${Url}/keyword-server`;
      const keywordUrl = baseUrl + target;
      axios.get<ResData>(keywordUrl).then(({ data }) => {
        setKeyRes(
          [...Object.entries(data.property)].map(
            ([code, { polygon, keywords, name }]) => {
              const newPoly = polygon.map((area) => {
                return area.map((lnglat) => {
                  return { lng: lnglat[0], lat: lnglat[1] };
                });
              });
              return [code, { polygon: newPoly, keywords, name }];
            }
          )
        );
        setIsKeyLoad(true);
      });
    }
  }, [target]);

  return { keyRes, isKeyLoad };
}
