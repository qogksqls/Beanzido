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

  return (
    <Map center={MyPosition} style={{ width: "100vw", height: "100vh" }}>
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
