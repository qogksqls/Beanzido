import ReactTooltip from "react-tooltip";

function NavToolTip() {
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
        getContent={(dataTip) => "시/군/구"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="dong"
        getContent={(dataTip) => "읍/면/동"}
        place="right"
        effect="solid"
      />
      <ReactTooltip
        id="si-do"
        getContent={(dataTip) => "시/도"}
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
