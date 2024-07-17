import React, { forwardRef, memo } from "react";

interface MemoProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default memo(
  forwardRef<HTMLDivElement, MemoProps>(function Memo(
    { children, className, style },
    ref
  ) {
    console.log("memo");
    return (
      <div className={className} style={style} ref={ref}>
        {children}
      </div>
    );
  })
);
