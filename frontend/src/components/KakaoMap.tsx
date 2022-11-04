import { useRecoilState } from "recoil";
import { Map, MapMarker, MapTypeControl } from "react-kakao-maps-sdk";
import Clusterer from "./Clusterer/Clusterer";
import { beanListState } from "store/atom";
import { useEffect, useState, memo } from "react";
import useGeolocation from "./hooks/useGeolocation";
import "./KakaoMap.scss";
import gps from "../assets/img/Gps.svg";
import plus from "../assets/img/plus.svg";
import minus from "../assets/img/minus.svg";
import my_location from "../assets/img/my_location.svg";
import { Bean } from "store/types";

function KakaoMap() {
  const [beanList] = useRecoilState(beanListState);
  const [level, setLevel] = useState(3);
  const [map, setMap] = useState<kakao.maps.Map>();
  const location = useGeolocation();
  const [clusterList, setClusterList] = useState(
    [] as {
      nickname: string;
      content: string;
      color: number;
      img: string;
      createdAt: string;
      latitude: number;
      longitude: number;
      location: string;
    }[][]
  );
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
  }, [location.loaded]);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  }, []);

  useEffect(() => {
    setClusterList(getCluster(level, beanList));
  }, [level, beanList]);

  return (
    <>
      {initialPosition.loaded && (
        <Map
          id="map"
          center={{ lat: initialPosition.lat, lng: initialPosition.lng }}
          isPanto={initialPosition.isPanto}
          className="map"
          onIdle={(map) => {
            setLevel(map.getLevel());
            SetinitialPosition({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
              loaded: true,
              isPanto: false,
            });
          }}
          onCreate={(map) => {
            setMap(map);
          }}
        >
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
                  x: 10,
                  y: 10,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
          {/* <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} /> */}
          <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
          {clusterList.map((clusteredBeanList, idx) => (
            <Clusterer beanList={clusteredBeanList} key={idx} />
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
          <div className="zoom-control">
            <img
              className="plus-button"
              onClick={() => {
                if (map) {
                  map.setLevel(level - 1, { animate: true });
                }
              }}
              src={plus}
              alt=""
            />
            <img
              className="minus-button"
              onClick={() => {
                if (map) {
                  map.setLevel(level + 1, { animate: true });
                }
              }}
              src={minus}
              alt=""
            />
          </div>
        </Map>
      )}
    </>
  );
}

function levelToDistance(num: number) {
  if (num > 0) {
    if (num < 5) {
      if (num === 1) return 20;
      else if (num === 2) return 30;
      else if (num === 3) return 50;
      else return 100;
    } else {
      return Math.pow(2, num - 5) * 250;
    }
  } else return 0;
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  var radLat1 = (Math.PI * lat1) / 180;
  var radLat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radTheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
}

function getCluster(
  level: number,
  beanList: {
    nickname: string;
    content: string;
    color: number;
    img: string;
    createdAt: string;
    latitude: number;
    longitude: number;
    location: string;
  }[]
) {
  var clustered = new Set();
  var newClusterList: Bean[][] = [];
  beanList.forEach((bean1, idx1) => {
    var tmp = new Array(bean1);
    beanList.forEach((bean2, idx2) => {
      if (bean1 !== bean2 && !clustered.has(idx1)) {
        if (
          getDistance(
            bean1.latitude,
            bean1.longitude,
            bean2.latitude,
            bean2.longitude
          ) < levelToDistance(level)
        ) {
          tmp.push(bean2);
          clustered.add(idx2);
        }
      }
    });
    if (!clustered.has(idx1)) {
      newClusterList.push(tmp);
    }
    clustered.add(idx1);
  });
  return newClusterList;
}

export default memo(KakaoMap);
