import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { locationState } from "store/atom";

const useGeolocation = () => {
  const [location, setLocation] = useRecoilState(locationState);

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      ...location,
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
    location.error && alert(location.error.code);
  }, []);

  return location;
};

export default useGeolocation;
