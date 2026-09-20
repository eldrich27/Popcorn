// components/Rating/Rating.tsx
import { useRef, useState, type SyntheticEvent } from "react";
import type { RatingProps, RatingSize } from "./Rating.types";
import { Star, STAR_COLOR } from "./Star";
import {
  clamp,
  roundToPrecision,
  defaultGetLabelText,
  SIZE_MAP,
} from "./rating.utils";

const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const defaultEmptyIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={STAR_COLOR}
    strokeWidth={1.5}
    strokeLinejoin="round"
    width="100%"
    height="100%"
  >
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export function Rating({
  value: valueProp,
  defaultValue = 0,
  onChange,
  onChangeActive,
  precision = 1,
  max = 5,
  size = "medium",
  orientation = "horizontal",
  readOnly = false,
  disabled = false,
  highlightSelectedOnly = false,
  icon = defaultIcon,
  emptyIcon = defaultEmptyIcon,
  name = "rating",
  getLabelText = defaultGetLabelText,
  showValue = false,
  className,
}: RatingProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const value = isControlled ? valueProp : internalValue;

  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const rootRef = useRef<HTMLSpanElement>(null);

  const displayValue = hoverValue ?? value ?? 0;
  const pxSize = typeof size === "number" ? size : SIZE_MAP[size as RatingSize];

  const getEventValue = (e: SyntheticEvent): number => {
    const rect = rootRef.current!.getBoundingClientRect();
    const mouseEvent = e as React.MouseEvent;
    const fraction =
      orientation === "vertical"
        ? 1 - (mouseEvent.clientY - rect.top) / rect.height // bottom = 0, top = max
        : (mouseEvent.clientX - rect.left) / rect.width;    // left = 0, right = max
    const raw = fraction * max;                // value in star units
    return clamp(roundToPrecision(raw, precision), precision, max);
  };

  const commit = (e: SyntheticEvent, newValue: number | null) => {
    // clicking the same spot clears the rating (MUI behavior)
    const next = newValue === value ? null : newValue;
    if (!isControlled) setInternalValue(next);
    onChange?.(e, next);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (readOnly || disabled) return;
    const v = getEventValue(e);
    setHoverValue(v);
    onChangeActive?.(e, v);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (readOnly || disabled) return;
    setHoverValue(null);
    onChangeActive?.(e, hoverValue ?? 0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (readOnly || disabled) return;
    commit(e, getEventValue(e));
  };

  // the radiogroup keeps its own box so hover math (getEventValue) ignores the value label
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
    <span
      ref={rootRef}
      role="radiogroup"
      aria-label={name}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        flexDirection: orientation === "vertical" ? "column-reverse" : "row",
        alignItems: "center",
        cursor: readOnly || disabled ? "default" : "pointer",
        opacity: disabled ? 0.4 : 1,
        gap: 2,
      }}
    >
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        // highlightSelectedOnly: only the chosen icon lights up, no cumulative trail
        const fraction = highlightSelectedOnly
          ? (Math.round(displayValue) === index ? 1 : 0)
          : clamp(displayValue - i, 0, 1);

        return (
            <div key={index}>
                <span style={{ position: "relative" }}>
                    <Star
                    filled={fraction}
                    icon={icon}
                    emptyIcon={emptyIcon}
                    size={pxSize}
                    orientation={orientation}
                    />
                    {/* screen-reader input (MUI does this too) */}
                    <input
                    type="radio"
                    name={name}
                    value={index}
                    checked={value === index}
                    readOnly
                    tabIndex={-1}
                    aria-label={getLabelText(index)}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        pointerEvents: "none",
                        margin: 0,
                    }}
                    />
                </span>
            </div>
        );
      })}
      {/* visually hidden live label */}
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {getLabelText(displayValue)}
      </span>
    </span>
    {showValue && displayValue > 0 && (
      <span style={{ fontSize: "0.6em", color: STAR_COLOR }}>
        {displayValue}/{max}
      </span>
    )}
    </span>
  );
}