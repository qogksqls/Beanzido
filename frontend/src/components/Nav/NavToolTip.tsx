import ReactTooltip from "react-tooltip";
import { useLocation } from "react-router-dom";

function NavToolTip() {
  const location = useLocation();
  return (
    <>
      <ReactTooltip
        id="community"
        getContent={(dataTip) => "커뮤니티 보기"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="goon-goo"
        getContent={(dataTip) =>
          location.pathname.split("/").length === 4
            ? "시/군/구"
            : "지도에서 보고 싶은 <시/군/구>를 선택해주세요."
        }
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="dong"
        getContent={(dataTip) =>
          location.pathname.split("/").length === 4 &&
          location.pathname.split("/")[2] === "dong"
            ? "읍/면/동"
            : "지도에서 보고 싶은 <읍/면/동>를 선택해주세요."
        }
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="si-do"
        getContent={(dataTip) => "대한민국 전체 보기"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="keyword"
        getContent={(dataTip) => "지역별 키워드 보기"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="one-bean"
        getContent={(dataTip) => "개별 콩"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="all-bean"
        getContent={(dataTip) => "전체 콩"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="feedback-btn"
        getContent={(dataTip) => "피드백"}
        place="right"
        effect="solid"
      />
    </>
  );
}

export default NavToolTip;
