export type Bean = {
  nickname: string;
  content: string;
  color: number;
  img: string;
  createdAt: string;
  latitude: number;
  longitude: number;
  location: string;
};

export type ColoredBean = {
  location: string;
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
