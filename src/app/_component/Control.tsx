import React, { useCallback, useEffect, useMemo } from "react";
import { useCtx } from "./context";

interface ControlProps {
  children: React.ReactNode;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  childrenRefs: React.MutableRefObject<HTMLDivElement[]>;
}

export default function Control({
  children,
  scrollRef,
  childrenRefs,
}: ControlProps) {
  const fullpage = useCtx();

  const scrollHandler = useMemo(() => {
    let timer: NodeJS.Timer | null = null;
    return (e: WheelEvent) => {
      e.preventDefault();
      if (timer) return;
      timer = setTimeout(() => {
        if (e.deltaY < 0) {
          fullpage.prevPage();
        } else {
          fullpage.nextPage();
        }
        timer = null;
      }, 500);
    };
  }, [fullpage]);

  const reSizeHandler = useCallback(() => {
    fullpage.reSize(childrenRefs.current);
  }, [childrenRefs, fullpage]);

  const scrollEvent = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    fullpage.init({ childrens: childrenRefs.current });

    el?.addEventListener("wheel", scrollHandler);
    el?.addEventListener("scroll", scrollEvent);
    window?.addEventListener("resize", reSizeHandler);
    return () => {
      el?.removeEventListener("wheel", scrollHandler);
      el?.removeEventListener("scroll", scrollEvent);
      window?.removeEventListener("resize", reSizeHandler);
    };
  }, [
    fullpage,
    childrenRefs,
    scrollRef,
    scrollHandler,
    reSizeHandler,
    scrollEvent,
  ]);

  return <>{children}</>;
}
