import React, { useRef, useState } from "react";
import { ctx } from "./context";
import Control from "./Control";
import { Controller } from "./controller";
import ScrollBox from "./ScrollBox";

interface ProviderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Provider({ className, children }: ProviderProps) {
  const [_renderState, renderer] = useState(-1);
  const [fullpage] = useState(new Controller(renderer));
  const scrollRef = useRef<HTMLDivElement>(null);
  const childrenRefs = useRef<HTMLDivElement[]>([]);

  return (
    <ctx.Provider value={fullpage}>
      <Control scrollRef={scrollRef} childrenRefs={childrenRefs}>
        <div className="overflow-hidden h-[100vh]">
          <ScrollBox
            className={[
              "transition-transform ease border-[1px]",
              className,
            ].join(" ")}
            style={{
              transform: fullpage.getTrasform(),
            }}
            ref={scrollRef}
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
          </ScrollBox>
        </div>
      </Control>
    </ctx.Provider>
  );
}
