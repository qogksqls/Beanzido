import { atom } from "recoil";

export const beanListState = atom({
  key: "beanListState",
  default: [] as {
    nickname: string;
    content: string;
    color: string;
    img?: string;
    createdAt: string;
    latitude: number;
    longitude: number;
  }[],
});

export const randomNameState = atom({
  key: "randomNameState",
  default: "",
});

export const beanColorState = atom({
  key: "beanColorState",
  default: 0,
});
