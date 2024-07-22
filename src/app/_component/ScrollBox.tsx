import React, { forwardRef, memo } from "react";

interface ScrollBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default memo(
  forwardRef<HTMLDivElement, ScrollBoxProps>(function ScrollBox(
    { children, className, style },
    ref
  ) {
    return (
      <div className={className} style={style} ref={ref}>
        {children}
      </div>
    );
  })
);
