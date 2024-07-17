import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ctx } from "./context";
import { Controller } from "./controller";
import Memo from "./Memo";

interface ProviderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Provider({ className, children }: ProviderProps) {
  const [_, renderer] = useState(0);
  const [fullpage] = useState(new Controller(renderer));
  const ref = useRef<HTMLDivElement>(null);

  console.log("page", fullpage.getState().page);
  const height = `calc(${-100 * (fullpage.getState().page - 1)}vh)`;
  console.log("height", height);
  const transform = `translate3d(0, ${height}, 0)`;

  const scrollHandler = useMemo(() => {
    let timer: NodeJS.Timer | null = null;
    return (e: WheelEvent) => {
      e.preventDefault();
      if (timer) return;
      timer = setTimeout(() => {
        console.log("scroll", e.deltaY);
        if (e.deltaY < 0) {
          fullpage.prevPage();
        } else {
          fullpage.nextPage();
        }
        timer = null;
      }, 500);
    };
  }, [fullpage]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("wheel", scrollHandler);
    return () => {
      el.removeEventListener("wheel", scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <ctx.Provider value={fullpage}>
      <Memo
        style={{ transform }}
        className={["transition-transform ease", className].join(" ")}
        ref={ref}
      >
        {children}
      </Memo>
    </ctx.Provider>
  );
}
