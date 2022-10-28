import { atom } from "recoil";

export const beanListState = atom({
  key: "beanListState",
  default: [] as {
    nickname: string;
    content: string;
    color: number;
    img: string;
    createdAt: string;
    latitude: number;
    longitude: number;
  }[],
});

export const nameState = atom({
  key: "nameState",
  default: "",
});

export const beanColorState = atom({
  key: "beanColorState",
  default: 0,
});
