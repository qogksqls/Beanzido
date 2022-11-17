import React, { useState } from "react";
import "./ExpandImg.scss";

type ImgProps = {
  photo: string;
  setExpandImg: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpandImg = ({ photo, setExpandImg }: ImgProps) => {
  return (
    <div className="expand-photo" onClick={() => setExpandImg(false)}>
      <div className="photo-box">
        <img src={photo} className="photo" alt="" />
      </div>
    </div>
  );
};

export default ExpandImg;
