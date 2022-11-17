import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useRecoilState } from "recoil";
import { sidebarState } from "store/atom";
import { useNavigate, useLocation } from "react-router-dom";

export default function useSideHandler(close: () => void) {
  const [isFull, setIsFull] = useState(false);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--inner-height", "300px");
    setIsFull(false);
    if (sidebar === 0) {
      setSidebar(1);
    }

    return () => {
      document.documentElement.style.setProperty("--mobile-border", "15px");
      document.documentElement.style.setProperty("--inner-height", "300px");
      setIsFull(false);
    };
  }, []);

  useEffect(() => {
    if (sidebar === 1) {
      document.documentElement.style.setProperty(
        "--scroll-width-default",
        "0px"
      );
    } else {
      document.documentElement.style.setProperty(
        "--scroll-width-default",
        "100%"
      );
    }
  }, [sidebar]);

  const upHandlers = useSwipeable({
    onSwiping: (eventData) => {
      document.documentElement.style.setProperty("--inner-transition", "");
      if (isFull) {
        if (
          eventData.deltaY > -50 &&
          eventData.deltaY < -50 + window.innerHeight
        ) {
          document.documentElement.style.setProperty(
            "--inner-height",
            `calc(var(--vh, 1vh) * 100 - ${eventData.deltaY + 50}px)`
          );
        }
      } else {
        if (
          eventData.deltaY < 270 &&
          eventData.deltaY > 300 - window.innerHeight
        ) {
          document.documentElement.style.setProperty(
            "--inner-height",
            `${300 - eventData.deltaY}px`
          );
        }
      }
    },
    onSwiped: (eventData) => {
      document.documentElement.style.setProperty(
        "--inner-transition",
        "all ease 300ms"
      );
      if (isFull) {
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100 - 50px)"
        );
      } else {
        document.documentElement.style.setProperty("--inner-height", "300px");
      }
      if (
        eventData.dir === "Up" &&
        eventData.deltaY < (-1 / 8) * window.innerHeight
      ) {
        setIsFull(true);
        document.documentElement.style.setProperty(
          "--inner-height",
          "calc(var(--vh, 1vh) * 100 - 50px)"
        );
      } else if (
        eventData.dir === "Down" &&
        eventData.deltaY > (1 / 8) * window.innerHeight
      ) {
        if (isFull) {
          document.documentElement.style.setProperty(
            "--inner-height",
            `calc(var(--vh, 1vh) * 100 - ${eventData.deltaY + 50}px)`
          );
        } else {
          document.documentElement.style.setProperty(
            "--inner-height",
            `${300 - eventData.deltaY}px`
          );
        }
        close();
      }
    },
  });

  const slideHandlers = useSwipeable({
    onSwipeStart: (eventData) => {
      if (eventData.dir === "Down" || eventData.dir === "Up") {
        setIsScroll(true);
      }
    },
    onSwiping: (eventData) => {
      if (!isScroll) {
        document.documentElement.style.setProperty("--scroll-transition", "");
        if (
          sidebar === 1 &&
          eventData.deltaX > -1 * window.innerWidth &&
          eventData.deltaX <= 30
        ) {
          document.documentElement.style.setProperty(
            "--scroll-width",
            `${eventData.deltaX}px`
          );
        } else if (
          sidebar === 2 &&
          eventData.deltaX < window.innerWidth &&
          eventData.deltaX >= -30
        ) {
          document.documentElement.style.setProperty(
            "--scroll-width",
            `${eventData.deltaX}px`
          );
        }
      }
    },
    onSwiped: (eventData) => {
      document.documentElement.style.setProperty("--scroll-width", "0px");
      document.documentElement.style.setProperty(
        "--scroll-transition",
        "all ease 300ms"
      );
      setIsScroll(false);
      if (
        eventData.dir === "Left" &&
        eventData.deltaX < (-1 / 4) * window.innerWidth
      ) {
        setSidebar(2);
      } else if (
        eventData.dir === "Right" &&
        eventData.deltaX > (1 / 4) * window.innerWidth
      ) {
        setSidebar(1);
      }
    },
  });

  return { upHandlers, slideHandlers };
}
