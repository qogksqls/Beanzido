import React from "react";
import { ReactComponent as Plus } from "assets/img/plus.svg";
import { ReactComponent as Minus } from "assets/img/minus.svg";

type MapZoomControlProps = {
  controlZoom: (level: number) => void;
  level: number;
};

function MapZoomControl({ controlZoom, level }: MapZoomControlProps) {
  return (
    <div className="zoom-control">
      <Plus className="plus-button" onClick={() => controlZoom(level - 1)} />
      <Minus className="minus-button" onClick={() => controlZoom(level + 1)} />
    </div>
  );
}

export default MapZoomControl;
