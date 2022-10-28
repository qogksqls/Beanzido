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
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <Map center={MyPosition} className="map">
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
