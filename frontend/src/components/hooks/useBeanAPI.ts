import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import axios from "axios";

export default function useBeanAPI() {
  const [, setBeanList] = useRecoilState(beanListState);

  const Url = process.env.REACT_APP_SEND_URL;

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get<
        {
          nickname: string;
          content: string;
          color: number;
          img: string;
          createdAt: string;
          latitude: number;
          longitude: number;
        }[]
      >(`https://${Url}/chat-server/chat/send`);
      setBeanList(data);
      // console.log(data);
      return true;
    } catch (e) {
      return false;
    }
  }, [setBeanList]);

  useEffect(() => {
    fetchData();
  }, []);
}
