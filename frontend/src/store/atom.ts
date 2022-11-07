import { atom } from "recoil";
import { Bean } from "./types";

export const beanListState = atom({
  key: "beanListState",
  default: [] as Bean[],
});

export const focusedState = atom({
  key: "focusedState",
  default: [] as Bean[],
});

export const nameState = atom({
  key: "nameState",
  default: "",
});

export const beanColorState = atom({
  key: "beanColorState",
  default: getRandomInt(0, 10),
});

export const sidebarState = atom({
  key: "sidebarState",
  default: 0,
});

// export const locationState = atom({
//   key: "locationState",
//   default: {
//     loaded: false,
//     coordinates: { lat: 0, lng: 0 },
//     error: { code: 0, message: "not loaded" },
//   },
// });

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
