import { atom } from "recoil";
import { Bean, Location } from "./types";

export const beanListState = atom<Bean[]>({
  key: "beanListState",
  default: [],
});

export const focusedState = atom<Bean[]>({
  key: "focusedState",
  default: [],
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

export const mapCenterState = atom({
  key: "mapCenterState",
  default: {
    lat: 0,
    lng: 0,
    loaded: false,
    isPanto: false,
  },
});

export const mapLevelState = atom({
  key: "mapLevelState",
  default: 3,
});

export const locationState = atom<Location>({
  key: "locationState",
  default: {
    loaded: false,
    coordinates: { lat: 37.5009614732362, lng: 127.03972084911923 },
  },
});

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
