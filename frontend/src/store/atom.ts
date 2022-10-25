import {atom} from "recoil";

export const beanListState = atom({
  key: 'beanListState',
  default: [] as {
    nickname: string;
    contents: string;
    color: string;
    img?: string;
    createdAt: string;
    Position: {
      lat: number;
      lng: number;
    };
  }[],
});