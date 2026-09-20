// components/Rating/Star.tsx
import type { CSSProperties, ReactNode } from "react";

// color of the filled portion; also used for the optional value label in Rating
export const STAR_COLOR = "#faaf00";

interface StarProps {
  filled: number; // 0–1 fraction of the star that is filled
  icon: ReactNode;
  emptyIcon: ReactNode;
  size: number;
  orientation?: "horizontal" | "vertical";
}

export function Star({ filled, icon, emptyIcon, size, orientation = "horizontal" }: StarProps) {
  const isVertical = orientation === "vertical";

  // clip layer grows from the "start" of the value axis: left for horizontal, bottom for vertical
  const clipStyle: CSSProperties = isVertical
    ? { position: "absolute", left: 0, right: 0, bottom: 0, height: `${filled * 100}%` }
    : { position: "absolute", top: 0, bottom: 0, left: 0, width: `${filled * 100}%` };

  // icon is pinned to the star's full size (not the clip layer's shrunken size) and
  // anchored to the same edge the clip grows from, so overflow crops it instead of the
  // icon itself rescaling to fit the smaller box
  const iconStyle: CSSProperties = isVertical
    ? { position: "absolute", left: 0, bottom: 0, width: size, height: size }
    : { position: "absolute", top: 0, left: 0, width: size, height: size };

  return (
    <span style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
      {/* empty layer */}
      <span style={{ position: "absolute", inset: 0 }}>{emptyIcon}</span>
      {/* filled layer, clipped */}
      <span style={{ ...clipStyle, overflow: "hidden", color: STAR_COLOR }}>
        <span style={iconStyle}>{icon}</span>
      </span>
    </span>
  );
}
