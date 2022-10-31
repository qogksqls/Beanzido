import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useRecoilState } from "recoil";
import useColor from "components/hooks/useColor";
import "./BeanStyle.scss";
import { beanColorState } from "store/atom";

type beanStyleProps = {
  setIsBeanStyle: Dispatch<SetStateAction<boolean>>;
};

export default function BeanStyle({ setIsBeanStyle }: beanStyleProps) {
  const [indexToColor] = useColor();
  const [beanColor, setBeanColor] = useRecoilState(beanColorState);
  function ChangeBeanStyle(props: { backgroundColor: string; color: string }) {
    document.documentElement.style.setProperty(
      "--create-bean-color",
      props.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--create-text-color",
      props.color
    );
  }
  useEffect(() => {
    ChangeBeanStyle(indexToColor(beanColor));
  });
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
              ChangeBeanStyle(indexToColor(idx));
            }}
          >
            <div
              className="circle"
              style={{
                backgroundColor: `${indexToColor(idx).backgroundColor}`,
              }}
            ></div>
            <div className="text">{indexToColor(idx).name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
