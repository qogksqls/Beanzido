import { atom } from "recoil";

export const beanListState = atom({
  key: "beanListState",
  default: [{
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5009,
    longitude: 127.0397,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5009,
    longitude: 127.0397,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5008,
    longitude: 127.0396,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5007,
    longitude: 127.0395,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5006,
    longitude: 127.0394,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5005,
    longitude: 127.0393,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5004,
    longitude: 127.0392,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5004,
    longitude: 127.0392,
  },
  {
    nickname: "괜찮은 김우창",
    content: "컨텐츠입니다. 컨텐츠가 많습니다.",
    color: 1,
    img: "",
    createdAt: "",
    latitude: 37.5,
    longitude: 127.038,
  },

  ] as {
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

// export const locationState = atom({
//   key: "locationState",
//   default: {
//     loaded: false,
//     coordinates: { lat: 0, lng: 0 },
//     error: { code: 0, message: "not loaded" },
//   },
// });
