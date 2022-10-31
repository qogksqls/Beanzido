import { useRecoilState } from "recoil";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import { beanListState } from "store/atom";
import { useEffect, useState, memo, useRef, useMemo, useCallback } from "react";
import useGeolocation from "./hooks/useGeolocation";
import "./KakaoMap.scss";

import gps from "../assets/img/Gps.svg";
import my_location from "../assets/img/my_location.svg";

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
    isPanto: false,
  });

  useEffect(() => {
    if (location.loaded === true && initialPosition.loaded === false) {
      SetinitialPosition({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        loaded: true,
        isPanto: false,
      });
    }
    console.log(initialPosition);
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
          isPanto={initialPosition.isPanto}
          className="map"
          onIdle={(map) => {
            SetinitialPosition({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
              loaded: true,
              isPanto: false,
            });
          }}
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
          <div className="gps">
            <img
              className="gps-img"
              src={gps}
              alt=""
              onClick={() => {
                SetinitialPosition({
                  lat: location.coordinates.lat,
                  lng: location.coordinates.lng,
                  loaded: true,
                  isPanto: true,
                });
              }}
            />
          </div>
          <MapMarker // 마커를 생성합니다
            position={{
              // 마커가 표시될 위치입니다
              lat: location.coordinates.lat,
              lng: location.coordinates.lng,
            }}
            image={{
              src: my_location,
              size: {
                width: 20,
                height: 20,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 0,
                  y: 0,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        </Map>
      )}
    </>
  );
}

export default memo(KakaoMap);
