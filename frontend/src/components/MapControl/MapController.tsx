import useMapControl from "components/hooks/useMapControl";
import MapZoomControl from "./MapZoomControl";
import MapGPSControl from "./MapGPSControl";
import MapTypeControl from "./MapTypeControl";
import "./MapController.scss";

type MapControlProps = {
  map: kakao.maps.Map;
  level: number;
  coordinates: {
    lat: number;
    lng: number;
  };
};

function MapController({ map, level, coordinates }: MapControlProps) {
  const { controlZoom, controlGPS, controlType } = useMapControl(map);

  return (
    <>
      <MapZoomControl controlZoom={controlZoom} level={level} />
      <MapGPSControl controlGPS={controlGPS} coordinates={coordinates} />
      <MapTypeControl controlType={controlType} />
    </>
  );
}

export default MapController;
