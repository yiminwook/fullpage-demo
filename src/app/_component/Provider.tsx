import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ctx } from "./context";
import { Controller } from "./controller";
import Memo from "./Memo";
import { getChildHeights } from "../_lib/getChildrenArray";

interface ProviderProps {
  children: React.ReactNode;
  className?: string;
  loader?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Provider({
  className,
  children,
  loader,
}: ProviderProps) {
  const [renderState, renderer] = useState(-1);
  const [fullpage] = useState(new Controller(renderer));
  const ref = useRef<HTMLDivElement>(null);
  const childrenRefs = useRef<HTMLDivElement[]>([]);

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

  const reSizeHandler = useCallback(() => {
    const heights = getChildHeights(childrenRefs.current);
    fullpage.reSize(heights);
  }, [childrenRefs, fullpage]);

  useEffect(() => {
    const el = ref.current;
    const heights = getChildHeights(childrenRefs.current);

    fullpage.init({ heights });

    el?.addEventListener("wheel", reSizeHandler);
    window?.addEventListener("resize", reSizeHandler);
    return () => {
      el?.removeEventListener("wheel", scrollHandler);
      window?.removeEventListener("resize", reSizeHandler);
    };
  }, [scrollHandler, fullpage, renderState, children, reSizeHandler]);

  if (!fullpage.initiallize) {
    return <ctx.Provider value={fullpage}>{loader}</ctx.Provider>;
  }

  console.log("trasform", fullpage.getTrasform());
  console.log("height", fullpage.getHeight());
  return (
    <ctx.Provider value={fullpage}>
      <div className="overflow-y-hidden">
        <Memo
          style={{
            transform: fullpage.getTrasform(),
            maxHeight: fullpage.getHeight(),
          }}
          className={["transition-transform ease", className].join(" ")}
          ref={ref}
        >
          {React.Children.map(children, (child, index) => (
            <div
              ref={(el) => {
                if (el) {
                  childrenRefs.current[index] = el;
                }
              }}
            >
              {child}
            </div>
          ))}
        </Memo>
      </div>
    </ctx.Provider>
  );
}
