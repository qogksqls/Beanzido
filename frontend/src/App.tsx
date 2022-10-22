import { useEffect, useState } from "react";
import "./App.scss";
import KakaoMap from "components/KakaoMap";
import useGeoLocation from "assets/hooks/useGeolocation";

function App() {
  const location = useGeoLocation();
  return (
    <div className="App">
      <KakaoMap MyPosition={location.coordinates}></KakaoMap>
    </div>
  );
}

export default App;
