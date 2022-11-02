import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import "./BeanStyle.scss";
import { beanColorState } from "store/atom";

type beanStyleProps = {
  setIsBeanStyle: Dispatch<SetStateAction<boolean>>;
};

export default function BeanStyle({ setIsBeanStyle }: beanStyleProps) {
  const [, setBeanColor] = useRecoilState(beanColorState);

  return (
    <>
      <div
        className="bean-style-back"
        onClick={() => setIsBeanStyle(false)}
      ></div>
      <div className="bean-style">
        {[...Array(10)].map((num, idx) => (
          <div
            className="bean-color"
            key={idx}
            onClick={(e) => {
              setBeanColor(idx);
              // ChangeBeanStyle(getColor(idx));
            }}
          >
            <div
              className="circle"
              style={{
                backgroundColor: `${getColor(idx).backgroundColor}`,
              }}
            ></div>
            <div className="text">{getColor(idx).name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function getColor(idx: number) {
  const IndexToColor = [
    { name: "완두콩", backgroundColor: "#c7f2a4", color: "black" },
    { name: "강낭콩", backgroundColor: "#e80081", color: "white" },
    { name: "쥐눈이콩", backgroundColor: "#A6A6A6", color: "black" },
    { name: "랜탈콩", backgroundColor: "#F57329", color: "black" },
    { name: "병아리콩", backgroundColor: "#FFE9A0", color: "black" },
    { name: "녹두", backgroundColor: "#377E19", color: "white" },
    { name: "땅콩", backgroundColor: "#E6BD46", color: "black" },
    { name: "검은콩", backgroundColor: "#4E4E4E", color: "white" },
    { name: "팥", backgroundColor: "#CC3737", color: "white" },
    { name: "젤리빈", backgroundColor: "#375E97", color: "white" },
  ];
  const name: string = IndexToColor[idx].name;
  const backgroundColor: string = IndexToColor[idx].backgroundColor;
  const newColor: string = IndexToColor[idx].color;
  return { name: name, color: newColor, backgroundColor: backgroundColor };
}
