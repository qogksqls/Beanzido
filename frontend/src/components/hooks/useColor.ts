import { useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { colorSelector } from "store/selector";
import { beanColorState } from "store/atom";

export default function useColor() {
  const { color, backgroundColor, beanColor } = useRecoilValue(colorSelector);
  const [, setBeanColor] = useRecoilState(beanColorState);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--create-bean-color",
      backgroundColor
    );
    document.documentElement.style.setProperty("--create-text-color", color);
    if (color === "black") {
      document.documentElement.style.setProperty(
        "--create-bean-light",
        "rgba(255, 255, 255, 0.4)"
      );
      document.documentElement.style.setProperty(
        "--create-bean-dark",
        "rgba(0, 0, 0, 0.05)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--create-bean-light",
        "rgba(255, 255, 255, 0.15)"
      );
      document.documentElement.style.setProperty(
        "--create-bean-dark",
        "rgba(0, 0, 0, 0.2)"
      );
    }
  }, [beanColor]);

  const getColor = useCallback((idx: number) => {
    const IndexToColor = [
      { name: "완두콩", backgroundColor: "#c7f2a4", color: "black" },
      { name: "강낭콩", backgroundColor: "#e80081", color: "white" },
      { name: "쥐눈이콩", backgroundColor: "#A6A6A6", color: "black" },
      { name: "렌틸콩", backgroundColor: "#F57329", color: "black" },
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
  }, []);

  return { beanColor, setBeanColor, getColor };
}
