import { ReactComponent as GPS } from "assets/img/Gps.svg";

type MapGPSControlProps = {
  controlGPS: (lat: number, lng: number) => void;
  coordinates: {
    lat: number;
    lng: number;
  };
};

function MapGPSControl({ controlGPS, coordinates }: MapGPSControlProps) {
  return (
    <div className="gps">
      <GPS
        className="gps-img"
        onClick={() => controlGPS(coordinates.lat, coordinates.lng)}
      />
    </div>
  );
}

export default MapGPSControl;
