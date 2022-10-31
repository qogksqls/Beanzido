import { useRecoilState } from "recoil";
import { focusedState } from "store/atom";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import ClusterBean from "components/ClusterBean/ClusterBean";

type ClusterProps = {
  beanList: {
    nickname: string;
    content: string;
    color: number;
    img: string;
    createdAt: string;
    latitude: number;
    longitude: number;
  }[];
};

function Clusterer({ beanList }: ClusterProps) {
  const [, setFocused] = useRecoilState(focusedState);

  return (
    <CustomOverlayMap
      position={{
        lat: beanList[beanList.length - 1].latitude,
        lng: beanList[beanList.length - 1].longitude,
      }}
      xAnchor={0}
      yAnchor={0}
      clickable
    >
      <div onClick={() => setFocused(beanList)}>
        {beanList.length === 1 ? (
          <Bean
            nickname={beanList[0].nickname}
            content={beanList[0].content}
            color={beanList[0].color}
            img={beanList[0].img}
            createdAt={beanList[0].createdAt}
          ></Bean>
        ) : (
          <ClusterBean
            nickname={beanList.map((bean) => bean.nickname).slice(-3)}
            content={beanList[beanList.length - 1].content}
            color={beanList.map((bean) => bean.color).slice(-3)}
            img={beanList[beanList.length - 1].img}
            createdAt={beanList[beanList.length - 1].createdAt}
          ></ClusterBean>
        )}
      </div>
    </CustomOverlayMap>
  );
}

export default Clusterer;
