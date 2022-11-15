import { useNavigate, useLocation } from "react-router-dom";
import React, { SetStateAction } from "react";
import "./SidebarKeyword.scss";
import closeIcon from "assets/img/Expand_left_light.svg";
import { useRecoilState } from "recoil";
import { rankState, regionNameState } from "store/atom";
import locationImg from "assets/img/location.svg";

type keywordRankProps = {
  setIsKeywordRank: React.Dispatch<SetStateAction<boolean>>;
};

const SidebarKeyword = ({ setIsKeywordRank }: keywordRankProps) => {
  const [keywordRank] = useRecoilState(rankState);
  const [regionName] = useRecoilState(regionNameState);

  return (
    <div className="sidebar-keyword">
      <div className="inner">
        <div className="keyword-rank header">
          <img src={locationImg} className="location-img" alt="" />
          <div style={{ color: "#1b6e6e" }}>{regionName}</div>의 키워드
          순위입니다.
        </div>
        <div className="keyword-rank rank">
          {Object.keys(keywordRank).length > 0 ? (
            Object.keys(keywordRank).map((keyword, idx) => {
              return (
                <div key={idx} className="item">
                  {idx === 0 ? (
                    <div className="medal item-rank1">{idx + 1}</div>
                  ) : (
                    <div>
                      {idx === 1 ? (
                        <div className="medal item-rank2">{idx + 1}</div>
                      ) : (
                        <div>
                          {idx === 2 ? (
                            <div className="medal item-rank3">{idx + 1}</div>
                          ) : (
                            <div className="item-rank-loser">{idx + 1}</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {/* <div
                    className={idx < 3 ? "item-rank" : "item-rank-style"}
                  ></div> */}
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
