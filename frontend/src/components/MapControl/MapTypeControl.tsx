import { useState } from "react";
import useColor from "components/hooks/useColor";

type MapTypeControlProps = {
  controlType: (maptype: string) => void;
};

function MapTypeControl({ controlType }: MapTypeControlProps) {
  const [mapType, setMapType] = useState("roadmap");
  const {} = useColor();

  return (
    <div className="type-control">
      <div
        className={mapType === "roadmap" ? "selected-btn" : "btn"}
        onClick={() => {
          controlType("roadmap");
          setMapType("roadmap");
        }}
      >
        지도
      </div>
      <div
        className={mapType === "skyview" ? "selected-btn" : "btn"}
        onClick={() => {
          controlType("skyview");
          setMapType("skyview");
        }}
      >
        스카이뷰
      </div>
    </div>
  );
}

export default MapTypeControl;
