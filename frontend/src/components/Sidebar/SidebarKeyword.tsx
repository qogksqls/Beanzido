import { useNavigate, useLocation } from "react-router-dom";
import "./SidebarKeyword.scss";
import useSideHandler from "components/hooks/useSideHandler";
import closeIcon from "assets/img/Expand_left_light.svg";
import { ReactComponent as X } from "assets/img/x.svg";
import { useRecoilState } from "recoil";
import {
  rankState,
  regionNameState,
  isKeywordRankState,
  sidebarState,
} from "store/atom";
import locationImg from "assets/img/location.svg";
import { useEffect } from "react";

const SidebarKeyword = () => {
  const [keywordRank] = useRecoilState(rankState);
  const [regionName] = useRecoilState(regionNameState);
  const [, setSidebar] = useRecoilState(sidebarState);
  const [, setIsKeywordRank] = useRecoilState(isKeywordRankState);
  const { upHandlers } = useSideHandler(() => setIsKeywordRank(false));
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/").length === 4) {
      if (location.pathname.split("/")[2] === "dong") {
        setSidebar(3);
      } else {
        setSidebar(2);
      }
    } else {
      setSidebar(1);
    }
    return () => setSidebar(0);
  }, []);

  return (
    <div className="sidebar-keyword">
      <div className="inner">
        <div className="keyword-rank header">
          <div className="swipe-handle" {...upHandlers} />
          <X className="close" onClick={() => setIsKeywordRank(false)} />
        </div>
        <div className="keyword-rank rank scroll-container">
          <div className="scroll">
            <div className="location-desc">
              <img src={locationImg} className="location-img" alt="" />
              <div style={{ color: "#1b6e6e" }}>{regionName}</div>의 키워드
              순위입니다.
            </div>
            {Object.keys(keywordRank).length > 0 ? (
              Object.keys(keywordRank).map((keyword, idx) => {
                return (
                  <div key={idx} className="item">
                    {idx === 0 ? (
                      <div className="perspective-container">
                        <div className="medal item-rank1">{idx + 1}</div>
                      </div>
                    ) : (
                      <div>
                        {idx === 1 ? (
                          <div className="perspective-container">
                            <div className="medal item-rank2">{idx + 1}</div>
                          </div>
                        ) : (
                          <div>
                            {idx === 2 ? (
                              <div className="perspective-container">
                                <div className="medal item-rank3">
                                  {idx + 1}
                                </div>
                              </div>
                            ) : (
                              <div className="item-rank-loser">{idx + 1}</div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="item-keyword">{keyword}</div>
                    <div className="item-count">
                      {Object.values(keywordRank)[idx]}회
                    </div>
                  </div>
                );
              })
            ) : (
              <div>콩이 하나도 없어요ㅠ^ㅠ</div>
            )}
          </div>
        </div>
      </div>
      <div
        className="keyword-rank handle"
        onClick={() => setIsKeywordRank(false)}
      >
        <img src={closeIcon} alt="open" />
      </div>
    </div>
  );
};

export default SidebarKeyword;
