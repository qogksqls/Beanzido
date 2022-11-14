import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "store/atom";
import Lottie from "lottie-react";
import searchAni from "assets/img/search.json";
import pinAni from "assets/img/pin.json";
import bubbleChat from "assets/img/bubble-chat.json";
import "./Nav.scss";

const CommunityIcons = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="switch"
        onClick={() => {
          navigate("/keyword");
          setSidebar(0);
        }}
        data-for={"keyword"}
        data-tip
      >
        <Lottie animationData={searchAni} className={"ani-img searchAni"} />
      </div>
      <div
        className={"switch " + (sidebar === 1 ? "active" : "")}
        onClick={() => {
          if (location.pathname !== "/sidebar") {
            navigate("/sidebar");
          }
          setSidebar(1);
        }}
        data-for="all-bean"
        data-tip
      >
        <Lottie animationData={bubbleChat} className="ani-img bubbleChat" />
      </div>
      <div
        className={"switch " + (sidebar === 2 ? "active" : "")}
        onClick={() => {
          if (location.pathname !== "/sidebar") {
            navigate("/sidebar");
          }
          setSidebar(2);
        }}
        data-for="one-bean"
        data-tip
      >
        <Lottie animationData={pinAni} className="ani-img pin" />
      </div>
    </>
  );
};

export default CommunityIcons;
