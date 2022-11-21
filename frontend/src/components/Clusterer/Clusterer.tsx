import { useRecoilState } from "recoil";
import { focusedState } from "store/atom";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import ClusterBean from "components/ClusterBean/ClusterBean";
import { Bean } from "store/types";

type ClusterProps = {
  beanList: Bean[];
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
        <ClusterBean
          nickname={beanList.map((bean) => bean.nickname).slice(-3)}
          content={beanList[beanList.length - 1].content}
          color={beanList.map((bean) => bean.color).slice(-3)}
          createdAt={beanList[beanList.length - 1].createdAt}
          contentFilter={beanList[beanList.length - 1].contentFilter}
        ></ClusterBean>
      </div>
    </CustomOverlayMap>
  );
}

export default Clusterer;
