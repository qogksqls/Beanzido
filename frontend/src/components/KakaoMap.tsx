import { useRecoilState } from "recoil";
import { Map } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import { beanListState } from "store/atom";
import { useEffect, useState, memo } from "react";
import useGeolocation from "./hooks/useGeolocation";

// type MapProps = {
//   MyPosition: {
//     lat: number;
//     lng: number;
//   };
// };

function KakaoMap() {
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const location = useGeolocation();
  const [initialPosition, SetinitialPosition] = useState({
    lat: 0,
    lng: 0,
    loaded: false,
  });
  useEffect(() => {
    if (location.loaded === true && initialPosition.loaded === false) {
      SetinitialPosition({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        loaded: true,
      });
    }
  }, [location.loaded]);
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      {initialPosition.loaded && (
        <Map
          center={{ lat: initialPosition.lat, lng: initialPosition.lng }}
          className="map"
        >
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
      )}
    </>
  );
}

export default memo(KakaoMap);
