// components/Rating/Rating.types.ts
import type { ReactNode, SyntheticEvent } from "react";

export type RatingSize = "small" | "medium" | "large";

export interface RatingProps {
  /** Current controlled value */
  value?: number | null;

  /** Initial uncontrolled value */
  defaultValue?: number;

  /** Fired when the user commits a rating (click) */
  onChange?: (
    event: SyntheticEvent,
    value: number | null
  ) => void;

  /** Fired while hovering (for live feedback) */
  onChangeActive?: (
    event: SyntheticEvent,
    hoverValue: number
  ) => void;

  /** Step granularity, e.g. 0.5 = half stars */
  precision?: number;

  /** Number of icons */
  max?: number;
  size?: RatingSize;
  readOnly?: boolean;
  disabled?: boolean;

  /** Layout axis. "vertical" stacks icons bottom (low) to top (high). */
  orientation?: "horizontal" | "vertical";

  /** Only highlight the selected icon, not all before it */
  highlightSelectedOnly?: boolean;

  /** Custom filled icon */
  icon?: ReactNode;

  /** Custom empty icon */
  emptyIcon?: ReactNode;

  /** aria-label for accessibility */
  name?: string;

  /** Text read by screen readers per value, e.g. "4 Stars" */
  getLabelText?: (value: number) => string;
  
  /** Show the current (or hovered) value, e.g. "7/10", beside the icons */
  showValue?: boolean;

  /** Extra className hook */
  className?: string;
}