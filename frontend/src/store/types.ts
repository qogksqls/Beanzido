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
