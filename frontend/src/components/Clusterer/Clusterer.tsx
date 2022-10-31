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
  return (
    <>
      {beanList.length === 1 ? (
        <Bean
          nickname={beanList[0].nickname}
          content={beanList[0].content}
          color={beanList[0].color}
          img={beanList[0].img}
          createdAt={beanList[0].createdAt}
          latitude={beanList[0].latitude}
          longitude={beanList[0].longitude}
        ></Bean>
      ) : (
        <ClusterBean
          nickname={beanList.map((bean) => bean.nickname).slice(-3)}
          content={beanList[beanList.length - 1].content}
          color={beanList.map((bean) => bean.color).slice(-3)}
          img={beanList[beanList.length - 1].img}
          createdAt={beanList[beanList.length - 1].createdAt}
          latitude={beanList[beanList.length - 1].latitude}
          longitude={beanList[beanList.length - 1].longitude}
        ></ClusterBean>
      )}
    </>
  );
}

export default Clusterer;
