import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import useGeolocation from "components/hooks/useGeolocation";
import useColor from "components/hooks/useColor";
import { mapCenterState } from "store/atom";
import useRandomName from "components/hooks/useRandomName";
import { SendMessage } from "react-use-websocket";
import imageCompression from "browser-image-compression";
import BeanStyle from "components/BeanStyle/BeanStyle";
import WebcamCapture from "./WebcamCapture";
import "./CreateBean.scss";
import { ReactComponent as XButton } from "../../assets/img/x.svg";
import { ReactComponent as RefreshButton } from "../../assets/img/refresh.svg";
import Camera from "../../assets/img/Camera.svg";
import Camera_white from "../../assets/img/Camera_white.svg";
import Img_box from "../../assets/img/Img_box.svg";
import Img_box_white from "../../assets/img/Img_box_white.svg";

type createBeanProps = {
  sendMessage: SendMessage;
};

export default function CreateBean({ sendMessage }: createBeanProps) {
  const [, setMapCenter] = useRecoilState(mapCenterState);
  const [isBeanStyle, setIsBeanStyle] = useState(false);
  const [contentValue, setContentValue] = useState(""); // content=
  const [camera, setCamera] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const { name, setRandomName } = useRandomName(); // nickname
  const { coordinates } = useGeolocation();
  const { beanColor, setBeanColor, getColor } = useColor();
  const navigate = useNavigate();

  async function handleImageUpload(event: any) {
    const imageFile = event.target.files[0];
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob);
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
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
    console.log(beanInfo);

    if (beanInfo.latitude === 0 || beanInfo.longitude === 0) {
      alert("위치 정보 제공에 동의해 주세요. 새로고침 ㄱㄱ");
    } else {
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
  }

  return (
    <>
      <div className="create-bean">
        <div className="header">
          <h2>글 작성</h2>
        </div>
        <XButton
          className="x"
          stroke="var(--create-text-color)"
          onClick={() => navigate("/")}
        />
        <div className="content">
          <div className="name-style">
            <div className="name-refresh">
              <h4>{name}</h4>
              <p>님,</p>
              <RefreshButton
                className="refresh"
                onClick={setRandomName}
                fill="transparent"
              />
            </div>
            <div className="style-button" onClick={() => setIsBeanStyle(true)}>
              <p>스타일 변경</p>
            </div>
          </div>
          {isBeanStyle && (
            <BeanStyle
              setIsBeanStyle={setIsBeanStyle}
              setBeanColor={setBeanColor}
              getColor={getColor}
            />
          )}
          <div className="message">
            <textarea
              onChange={(event) => setContentValue(event.currentTarget.value)}
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
                  setCamera(false);
                }
              }}
            >
              <img
                className="capture"
                src={imgSrc}
                onClick={() => setCamera(true)}
                alt="캡쳐"
              />
            </div>
          ) : (
            <div className="camera-picture">
              {camera ? (
                <WebcamCapture setCamera={setCamera} setImgSrc={setImgSrc} />
              ) : (
                <div className="camera-btn" onClick={() => setCamera(true)}>
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
          <div
            className="finish-button"
            onClick={() => {
              SaveBean();
              // console.log(coordinates);
              setMapCenter({
                lat: coordinates.lat,
                lng: coordinates.lng,
                loaded: true,
                isPanto: true,
              });
            }}
          >
            <h3>글 작성 완료</h3>
          </div>
        </div>
      </div>
      <div className="create-bean-back" onClick={() => navigate("/")}></div>
    </>
  );
}
