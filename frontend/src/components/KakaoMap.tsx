import { FunctionComponent } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Props {}
 
const KakaoMap: FunctionComponent<Props> = () => {
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{color:"#000"}}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
 
export default KakaoMap;