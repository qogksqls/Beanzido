import useGeolocation from "components/hooks/useGeolocation";
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

export const mapCenterState = atom({
  key: "mapCenterState",
  default: {
    lat: 0,
    lng: 0,
    loaded: false,
    isPanto: false,
  }
});


function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
