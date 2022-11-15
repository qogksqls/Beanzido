type BeanBase = {
  nickname: string;
  content: string;
  img: string;
  createdAt: string;
  latitude: number;
  longitude: number;
  location: string;
  imgFilter: string;
  contentFilter: boolean;
};

export type Bean = BeanBase & {
  color: number;
};

export type ColoredBean = BeanBase & {
  color: {
    name: string;
    backgroundColor: string;
    color: string;
  };
};

export type LngLat = { lng: number; lat: number };

export type Location = {
  loaded: boolean;
  coordinates: { lat: number; lng: number };
  error?: { code: number; message: string };
};
