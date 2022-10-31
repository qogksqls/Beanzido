import { useCallback } from "react";

export default function useColor() {
  const indexToColor = useCallback((idx: number) => {
    const IndexToColor = [
      { name: "완두콩", backgroundColor: "#c7f2a4", color: "black" },
      { name: "강낭콩", backgroundColor: "#F25F9B", color: "black" },
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
    const color: string = IndexToColor[idx].color;
    return { name: name, backgroundColor: backgroundColor, color: color };
  }, []);
  return [indexToColor];
}
