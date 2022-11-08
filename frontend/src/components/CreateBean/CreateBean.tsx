import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { colorSelector } from "store/selector";
import Webcam from "react-webcam";
import useRandomName from "components/hooks/useRandomName";
import BeanStyle from "components/BeanStyle/BeanStyle";
import imageCompression from "browser-image-compression";
import "./CreateBean.scss";
import x from "../../assets/img/x.svg";
import Camera from "../../assets/img/Camera.svg";
import Camera_white from "../../assets/img/Camera_white.svg";
import Img_box from "../../assets/img/Img_box.svg";
import Img_box_white from "../../assets/img/Img_box_white.svg";
import 새로고침 from "../../assets/img/새로고침.svg";
import { SendMessage } from "react-use-websocket";
import useGeolocation from "components/hooks/useGeolocation";
import { useNavigate } from "react-router-dom";

type createBeanProps = {
  sendMessage: SendMessage;
};

export default function CreateBean({ sendMessage }: createBeanProps) {
  const [isBeanStyle, setIsBeanStyle] = useState(false);
  const { name, setRandomName } = useRandomName(); // nickname
  const [contentValue, setContentValue] = useState(""); // content
  function onContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContentValue(e.currentTarget.value);
  }
  const { coordinates } = useGeolocation();
  const { color, backgroundColor, beanColor } = useRecoilValue(colorSelector);
  const [camera, setCamera] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--create-bean-color",
      backgroundColor
    );
    document.documentElement.style.setProperty("--create-text-color", color);
  }, [beanColor, color, backgroundColor]);
  function OnCamera() {
    setCamera(true);
  }
  function cancelCamera() {
    setCamera(false);
  }
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState("");
  const WebcamCapture = () => {
    const capture = useCallback(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc ? imageSrc : "null");
      }
      cancelCamera();
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
          <div onClick={cancelCamera}>취소</div>
        </div>
      </div>
    );
  };

  async function handleImageUpload(event: any) {
    const imageFile = event.target.files[0];
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob);
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 480,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // );
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // );
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        // console.log(reader.result);
        setImgSrc("" + reader.result);
      };
    } catch (error) {
      console.log(error);
    }
  }

  function SaveBean() {
    const beanInfo = {
      nickname: name,
      content: contentValue
        ? contentValue.replace(/(?:\r\n|\r|\n)/g, "<br/>")
        : "",
      color: beanColor,
      img: imgSrc,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      location: "",
      code: 0,
    };

    if (contentValue || imgSrc) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(
        coordinates.lng,
        coordinates.lat,
        (result, status) => {
          for (var i = 0; i < result.length; i++) {
            if (result[i].region_type === "B") {
              beanInfo.location = result[i].address_name;
              beanInfo.code = +result[i].code.slice(0, 8);
              sendMessage(JSON.stringify(beanInfo));
              navigate("/");
            }
          }
        }
      );
    } else {
      alert("전할 메시지를 적어주세요.");
    }
  }

  return (
    <>
      <div className="create-bean">
        <div className="header">
          <h2>글 작성</h2>
        </div>
        <img className="x" src={x} alt="" onClick={() => navigate("/")} />
        <div className="content">
          <div className="name-style">
            <div className="name-refresh">
              <h4>{name}</h4>
              <p>님,</p>
              <img
                className="refresh"
                src={새로고침}
                alt=""
                onClick={setRandomName}
              />
            </div>
            <div className="style-button" onClick={() => setIsBeanStyle(true)}>
              <p>스타일 변경</p>
            </div>
          </div>
          {isBeanStyle && <BeanStyle setIsBeanStyle={setIsBeanStyle} />}
          <div className="message">
            <textarea
              onChange={onContentChange}
              value={contentValue}
              placeholder="전하고 싶은 메시지를 입력해주세요."
            />
          </div>
          {imgSrc ? (
            <div
              className="capture-box"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm("사진을 재설정 하시겠습니까?")) {
                  setImgSrc("");
                  cancelCamera();
                }
              }}
            >
              <img
                className="capture"
                src={imgSrc}
                onClick={OnCamera}
                alt="캡쳐"
              />
            </div>
          ) : (
            <div className="camera-picture">
              {camera ? (
                <WebcamCapture />
              ) : (
                <div className="camera-btn" onClick={OnCamera}>
                  {[1, 5, 7, 8, 9].includes(beanColor) ? (
                    <img className="camera-img" src={Camera_white} alt="" />
                  ) : (
                    <img className="camera-img" src={Camera} alt="" />
                  )}
                  <div>
                    <h4>카메라(선택)</h4>
                    <p>사진 첨부 시 사진 촬영</p>
                  </div>
                </div>
              )}
              {camera ? (
                <></>
              ) : (
                <div>
                  <input
                    id="picture"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="picture" className="picture">
                    {[1, 5, 7, 8, 9].includes(beanColor) ? (
                      <img className="picture-img" src={Img_box_white} alt="" />
                    ) : (
                      <img className="picture-img" src={Img_box} alt="" />
                    )}

                    <div>
                      <h4>사진(선택)</h4>
                      <p>사진을 첨부할 수 있어요.</p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          )}
          <div className="finish-button" onClick={SaveBean}>
            <h3>글 작성 완료</h3>
          </div>
        </div>
      </div>
      <div className="create-bean-back" onClick={() => navigate("/")}></div>
    </>
  );
}
