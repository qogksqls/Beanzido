import { useRecoilState } from "recoil";
import { Map } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import { beanListState } from "store/atom";
import { useEffect } from "react";

type MapProps = {
  MyPosition: {
    lat: number;
    lng: number;
  };
};

function KakaoMap({ MyPosition }: MapProps) {
  const [beanList, setBeanList] = useRecoilState(beanListState);
  let vh = "100vh";
  useEffect(() => {
    vh = window.innerHeight ? window.innerHeight + "px" : vh;
  }, []);

  return (
    <Map center={MyPosition} style={{ width: "100vw", height: vh }}>
      {beanList.map((BeanProps, index) => (
        <Bean
          nickname={BeanProps.nickname}
          content={BeanProps.content}
          color={BeanProps.color}
          img={BeanProps.img}
          createdAt={BeanProps.createdAt}
          latitude={BeanProps.latitude}
          longitude={BeanProps.longitude}
          key={index}
        ></Bean>
      ))}
    </Map>
  );
}

export default KakaoMap;
