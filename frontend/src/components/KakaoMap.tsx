import { useRecoilState } from "recoil";
import { Map, MapMarker, MapTypeControl } from "react-kakao-maps-sdk";
import { Routes, Route } from "react-router-dom";
import Clusterer from "./Clusterer/Clusterer";
import { beanListState, mapCenterState } from "store/atom";
import { useEffect, useState, memo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useGeolocation from "./hooks/useGeolocation";
import "./KakaoMap.scss";
import MapController from "./MapControl/MapController";
import my_location from "../assets/img/my_location.svg";
import { Bean } from "store/types";
import KeywordMap from "./KeywordMap/KeywordMap";
import KeywordDo from "./KeywordMap/KeywordDo";
import KeywordSi from "./KeywordMap/KeywordSi";
import KeywordDong from "./KeywordMap/KeywordDong";

function KakaoMap() {
  const [beanList] = useRecoilState(beanListState);
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterState);
  const [level, setLevel] = useState(3);
  const [map, setMap] = useState<kakao.maps.Map>();
  const location = useGeolocation();
  const routerLocation = useLocation();
  const [clusterList, setClusterList] = useState([] as Bean[][]);
  // const [initialPosition, SetinitialPosition] = useState({
  //   lat: 0,
  //   lng: 0,
  //   loaded: false,
  //   isPanto: false,
  // });

  useEffect(() => {
    if (location.loaded === true && mapCenter.loaded === false) {
      setMapCenter({
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
  }, [routerLocation.pathname, map]);

  useEffect(() => {
    setClusterList(getCluster(level, beanList.slice(-100)));
  }, [level, beanList]);

  return (
    <>
      {mapCenter.loaded && (
        <Map
          id="map"
          center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          isPanto={mapCenter.isPanto}
          className="map"
          onIdle={(map) => {
            setLevel(map.getLevel());
            setMapCenter({
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
          <MapMarker
            position={{
              lat: location.coordinates.lat,
              lng: location.coordinates.lng,
            }}
            image={{
              src: my_location,
              size: {
                width: 20,
                height: 20,
              },
              options: {
                offset: {
                  x: 10,
                  y: 10,
                },
              },
            }}
          />
          {map && (
            <Routes>
              <Route path="keyword/*" element={<KeywordMap map={map} />}>
                <Route path="" element={<KeywordDo map={map} />} />
                <Route path="si/:siCode" element={<KeywordSi map={map} />} />
                <Route
                  path="dong/:dongCode"
                  element={<KeywordDong map={map} />}
                />
              </Route>
              <Route
                path="*"
                element={clusterList.map((clusteredBeanList, idx) => (
                  <Clusterer beanList={clusteredBeanList} key={idx} />
                ))}
              />
            </Routes>
          )}
          {map && (
            <MapController
              map={map}
              level={level}
              coordinates={location.coordinates}
            />
          )}
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

function getCluster(level: number, beanList: Bean[]) {
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
