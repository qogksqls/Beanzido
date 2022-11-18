import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { beanListSelector, focusedListSelector } from "store/selector";
import "./Sidebar.scss";
import closeIcon from "assets/img/Expand_left_light.svg";
import { ReactComponent as X } from "assets/img/x.svg";
import { useNavigate } from "react-router-dom";
import sadBean from "assets/img/bean-sad.svg";
import Lottie from "lottie-react";
import locationAni from "assets/img/location.json";
import _ from "lodash";
import useBeanAPI from "components/hooks/useBeanAPI";
import ChatList from "components/ChatList/ChatList";
import useSideHandler from "components/hooks/useSideHandler";
import { sidebarState } from "store/atom";

export default function Sidebar() {
  const coloredBeanList = useRecoilValue(beanListSelector);
  const coloredFocusedList = useRecoilValue(focusedListSelector);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const navigate = useNavigate();
  const { isBeanLoad } = useBeanAPI();
  const { upHandlers, slideHandlers } = useSideHandler(() => navigate("/"));

  useEffect(() => {
    if (sidebar === 0) {
      setSidebar(1);
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="slide-handle" onClick={() => navigate("/")}>
        <img src={closeIcon} alt="open" />
      </div>
      <div className="inner">
        <div className="header">
          <div className="swipe-handle" {...upHandlers} />
          <X className="close" onClick={() => navigate("/")} />
        </div>
        <div className="scroll-container" {...slideHandlers}>
          <div className="scroll first">
            <div className="scroll-description">
              <div className="description-header">
                <div style={{ marginRight: "5px" }}>전국</div>
                모든 콩들의 대화 내용입니다.
              </div>
            </div>
            {isBeanLoad && _.isEmpty(coloredBeanList) ? (
              <div className="empty-list">
                <img src={sadBean} alt="" />
                "Beanzido에 콩이 하나도 없어요..."
              </div>
            ) : (
              <ChatList chatList={coloredBeanList} />
            )}
          </div>
          <div className="scroll second">
            <div className="scroll-description">
              {coloredFocusedList.length > 0 && (
                <div>
                  <div className="description-header">
                    <Lottie
                      animationData={locationAni}
                      className="location-img"
                    />
                    <div>
                      {
                        coloredFocusedList[coloredFocusedList.length - 1]
                          .location
                      }
                    </div>
                    에 있는
                  </div>
                  콩들의 대화 내용입니다.
                </div>
              )}
            </div>
            {isBeanLoad && _.isEmpty(coloredFocusedList) ? (
              <div className="empty-list">
                <img src={sadBean} alt="" />
                "Beanzido에 심어진 콩을 클릭해봐"
              </div>
            ) : (
              <ChatList chatList={coloredFocusedList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
