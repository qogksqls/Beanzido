import { useRecoilState } from "recoil";
import { Map } from "react-kakao-maps-sdk";
import Bean from "components/Bean/Bean";
import { beanListState } from "store/atom";

type MapProps = {
  MyPosition: {
    lat: number;
    lng: number;
  };
};

function KakaoMap({ MyPosition }: MapProps) {
  const [beanList, setBeanList] = useRecoilState(beanListState);
  const vh = window.innerHeight ? window.innerHeight + "px" : "100vh";
  console.log(vh);

  return (
    <Map center={MyPosition} style={{ width: "100vw", height: vh }}>
      {beanList.map((BeanProps, index) => (
        <Bean
          nickname={BeanProps.nickname}
          contents={BeanProps.content}
          color={BeanProps.color}
          img={BeanProps.img}
          createdAt={BeanProps.createdAt}
          Position={{ lat: BeanProps.latitude, lng: BeanProps.longitude }}
          key={index}
        ></Bean>
      ))}
    </Map>
  );
}

export default KakaoMap;
