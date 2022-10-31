import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { nameState } from "store/atom";

export default function useRandomName() {
  const [name, setName] = useRecoilState(nameState);

  const setRandomName = () => {
    const first = [
      "괜찮은",
      "평범한",
      "납작한",
      "멍청한",
      "똑똑한",
      "앙상한",
      "지적인",
      "관대한",
      "악독한",
      "방탕한",
    ];
    const last = [
      "치와와",
      "빈지노",
      "판다곰",
      "김우창",
      "강낭콩",
      "외국인",
      "도마뱀",
      "잠자리",
      "하운드",
      "순례자",
    ];
    const nickname =
      first[Math.floor(Math.random() * first.length)] +
      " " +
      last[Math.floor(Math.random() * last.length)];

    setName(nickname);
    return true;
  };
  useEffect(() => {
    if (!name) {
      setRandomName();
    }
  }, []);
  return { name, setRandomName };
}
