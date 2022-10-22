import React from "react";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useGeoLocation from "assets/hooks/useGeolocation";

function App() {
  const location = useGeoLocation();

  const MyPosition = location.coordinates? location.coordinates
  : {lat: 37.5009614732362, lng: 127.03972084911923}

  return (
    <div className="App">
      <KakaoMap MyPosition={MyPosition}></KakaoMap>
    </div>
  );
}

export default App;
