import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useRecoilState } from "recoil";
import { beanColorState } from "store/atom";
import useColor from "components/hooks/useColor";
import Webcam from "react-webcam";
import useRandomName from "components/hooks/useRandomName";
import BeanStyle from "components/BeanStyle/BeanStyle";

import "./CreateBean.scss";
import x from "../../assets/img/x.svg";
import Camera from "../../assets/img/Camera.svg";
import Img_box from "../../assets/img/Img_box.svg";
import 새로고침 from "../../assets/img/새로고침.svg";

type createBeanProps = {
  setIsCreateBean: Dispatch<SetStateAction<boolean>>;
};

export default function CreateBean({ setIsCreateBean }: createBeanProps) {
  const [isBeanStyle, setIsBeanStyle] = useState(false);
  const { name, setRandomName } = useRandomName(); // nickname
  const [contentValue, setContentValue] = useState(""); // content
  function onContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContentValue(e.currentTarget.value);
  }

  const [beanColor, setBeanColor] = useRecoilState(beanColorState);
  const [indexToColor] = useColor(); // color

  const [camera, setCamera] = useState(false);
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
        <button onClick={capture}>촬영</button>
        <button onClick={cancelCamera}>취소</button>
      </div>
    );
  };

  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  let seconds = today.getSeconds(); // 초
  let milliseconds = today.getMilliseconds(); // 밀리초
  let time = `${year}/${month}/${date} - ${hours}:${minutes}:${seconds}:${milliseconds}`;

  function SaveBaen() {
    console.log("글작성");
    const beanInfo = {
      ninkname: name,
      content: contentValue,
      color: indexToColor(beanColor).backgroundColor,
      img: imgSrc,
      createdAt: time,
      latitude: "",
      longitude: "",
    };
  }

  return (
    <>
      <div
        className="create-bean-back"
        onClick={() => setIsCreateBean(false)}
      ></div>
      <div className="create-bean">
        <div className="header">
          <h2>글 작성</h2>
        </div>
        <img
          className="x"
          src={x}
          alt=""
          onClick={() => setIsCreateBean(false)}
        />
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
            <div className="capture-box">
              <img
                className="capture"
                src={imgSrc}
                onClick={OnCamera}
                alt="캡쳐"
              />
            </div>
          ) : (
            <div className="camera-picture">
              <div className="camera-btn">
                <img className="camera-img" src={Camera} alt="" />
                <div onClick={OnCamera}>
                  <h4>카메라(선택)</h4>
                  <p>사진 첨부 시 사진 촬영</p>
                </div>
              </div>
              <div className="picture">
                <img className="picture-img" src={Img_box} alt="" />
                <div>
                  <h4>사진(선택)</h4>
                  <p>사진 첨부 시 이미지 첨부</p>
                </div>
              </div>
            </div>
          )}
          <div className="finish-button" onClick={SaveBaen}>
            <h3>글 작성 완료</h3>
          </div>
        </div>
      </div>
      {camera && <WebcamCapture />}
    </>
  );
}
