import { useState, useCallback, useRef, memo } from "react";
import Webcam from "react-webcam";

type CaptureProps = {
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
};

function WebcamCapture({ setCamera, setImgSrc }: CaptureProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc ? imageSrc : "null");
    }
    setCamera(false);
  }, [webcamRef, setImgSrc]);
  return (
    <div className="camera">
      <Webcam
        className="webcam"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <div className="capture-buttons">
        <div onClick={capture}>촬영</div>
        <div onClick={() => setCamera(false)}>취소</div>
      </div>
    </div>
  );
}

export default memo(WebcamCapture);
