import { useState, useEffect } from "react";

interface locationType {
  loaded: boolean;
  coordinates: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });
  const initialLocation = {
    lat: 37.5009614732362,
    lng: 127.03972084911923,
  };
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    initialLocation.lat = location.coords.latitude;
    initialLocation.lng = location.coords.longitude;
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: { code: number; message: string }) => {
    console.log("position error");
    setLocation({
      loaded: true,
      coordinates: {
        lat: 37.5009614732362,
        lng: 127.03972084911923,
      },
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
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  return { location, initialLocation };
};

export default useGeolocation;
