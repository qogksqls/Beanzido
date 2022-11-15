import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { beanListState } from "store/atom";
import axios from "axios";
import { Bean } from "store/types";

export default function useBeanAPI() {
  const [, setBeanList] = useRecoilState(beanListState);
  const [isBeanLoad, setIsBeanLoad] = useState(false);

  const Url = process.env.REACT_APP_SEND_URL;

  const fetchBean = useCallback(() => {
    axios
      .get<Bean[]>(`https://${Url}/chat-server/chat/send`)
      .then(({ data }) => {
        setIsBeanLoad(true);
        setBeanList(data);
      })
      .catch((err) => console.log(err));
  }, [setBeanList]);

  return { isBeanLoad, fetchBean };
}
