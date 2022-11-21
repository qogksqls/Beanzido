import { useState, useEffect, useRef } from "react";

export default function useTime(createdAt: string) {
  const [elapsedText, setElapsedText] = useState("");
  useInterval(() => setElapsedText(getElapsedText(createdAt)), 60);

  return [elapsedText];
}

function getElapsedText(createdAt: string) {
  const today = new Date();
  let elapsedTime: number = Math.trunc((today.getTime() - +createdAt) / 1000);
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // if (elapsedTime < seconds * 10) {
  //   return "방금 전";
  // } else
  if (elapsedTime < minute) {
    return "방금 전";
    // return elapsedTime + "초 전";
  } else if (elapsedTime < hour) {
    return Math.trunc(elapsedTime / minute) + "분 전";
  } else if (elapsedTime < day) {
    return Math.trunc(elapsedTime / hour) + "시간 전";
  } else {
    return Math.trunc(elapsedTime / day) + "일 전";
  }
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<(() => void) | null>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
