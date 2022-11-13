import { useState, useCallback } from "react";

export default function useMapControl(map: kakao.maps.Map) {
  const controlZoom = useCallback(
    (level: number) => {
      map.setLevel(level, { animate: true });
    },
    [map]
  );

  const controlGPS = useCallback(
    (lat: number, lng: number) => {
      map.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [map]
  );

  const controlType = useCallback(
    (maptype: string) => {
      if (maptype === "roadmap") {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
      } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      }
    },
    [map]
  );

  return { controlZoom, controlGPS, controlType };
}
