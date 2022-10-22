import { Map } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import { Suspense } from "react";

type MapProps = {
  MyPosition: {
    lat: number;
    lng: number;
  };
};

function KakaoMap({ MyPosition }: MapProps) {
  const BeanList = [
    {
      Position: MyPosition,
      nickname: "황태희",
      contents: "안녕하세요 이게 되는지 잘 모르겠네요",
      color: "red",
      img: "",
      createdAt: Date(),
    },
  ];
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
