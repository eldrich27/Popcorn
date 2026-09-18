// components/Rating/Star.tsx
import type { ReactNode } from "react";

interface StarProps {
  filled: number; // 0–1 fraction of the star that is filled
  icon: ReactNode;
  emptyIcon: ReactNode;
  size: number;
}

export function Star({ filled, icon, emptyIcon, size }: StarProps) {
  return (
    <span style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
      {/* empty layer */}
      <span style={{ position: "absolute", inset: 0 }}>{emptyIcon}</span>
      {/* filled layer, clipped */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          width: `${filled * 100}%`,
          overflow: "hidden",
          color: "#faaf00",
        }}
      >
        {/* fixed to the full star size so clipping crops it instead of the icon rescaling to fit */}
        <span style={{ display: "block", width: size, height: size }}>{icon}</span>
      </span>
    </span>
  );
}