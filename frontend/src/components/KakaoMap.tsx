import { Map } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import { Suspense } from "react";

type MapProps = {
  BeanList: {
    nickname: string;
    contents: string;
    color: string;
    img?: string;
    createdAt: string;
    Position: {
      lat: number;
      lng: number;
    };
  }[];
  MyPosition: {
    lat: number;
    lng: number;
  };
};

function KakaoMap({ BeanList, MyPosition }: MapProps) {
  return (
    <Map center={MyPosition} style={{ width: "100vw", height: "100vh" }}>
      {BeanList.map((BeanProps, index) => (
        <Bean
          nickname={BeanProps.nickname}
          contents={BeanProps.contents}
          color={BeanProps.color}
          img={BeanProps.img}
          createdAt={BeanProps.createdAt}
          Position={BeanProps.Position}
        ></Bean>
      ))}
    </Map>
  );
}

export default KakaoMap;
