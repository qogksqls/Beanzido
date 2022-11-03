import { useState, useEffect } from "react";

interface positionType {
  coords: { lat: number; lng: number };
  loaded: Boolean,
  isPanto: Boolean,
  error?: { code: number; message: string };
}

const useTargetLocation = () => {
  const [targetposition, SetPosition] = useState<positionType>({
    coords: { lat: 0, lng: 0 },
    loaded: true, 
    isPanto: true,
  });

  const onSuccess = (targetposition: {
    coords: { lat: number; lng: number };
  }) => {
    SetPosition({
      coords: {
        lat: targetposition.coords.lat,
        lng: targetposition.coords.lng,
      },
      loaded: true,            
      isPanto: true,
    });
  };
  const onError = (error: { code: number; message: string }) => {
    console.log("targetposition error");
    SetPosition({
      loaded: true,
      coords: {
        lat: 37.5009614732362,
        lng: 127.03972084911923,
      },
      isPanto: true,
      error,
    });
  };

  return targetposition
};

export default useTargetLocation;