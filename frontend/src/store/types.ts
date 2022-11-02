export type Bean = {
  nickname: string;
  content: string;
  color: number;
  img: string;
  createdAt: string;
  latitude: number;
  longitude: number;
};

export type ColoredBean = {
  nickname: string;
  content: string;
  color: {
    name: string;
    backgroundColor: string;
    color: string;
  };
  img: string;
  createdAt: string;
  latitude: number;
  longitude: number;
};
