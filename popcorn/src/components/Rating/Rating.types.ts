// components/Rating/Rating.types.ts
import type { ReactNode, SyntheticEvent } from "react";

export type RatingSize = "small" | "medium" | "large";

export interface RatingProps {
  value? : number | null;    // Current cotrolled valus
  defaultValue? : number;    // Initial uncontrolled value
  onCahnge? :(               // Fired when the user commits a rating (click)
    event: SyntheticEvent,
    value: number | null
  )=> void;
  
  onChangeActive?: (         /** Fired while hovering (for live feedback) */
    event: SyntheticEvent,
    hoverValue: number
  ) => void;
  
  precision?: number;       /** Step granularity, e.g. 0.5 = half stars */
  max?: number;             /** Number of icons */
  size?: RatingSize;        /* small | medium | large*/
  readOnly?: boolean;
  disabled?: boolean;
  
  highlightSelectedOnly?: boolean; /** Only highlight the selected icon, not all before it */
  icon?: ReactNode;                /** Custom filled icon */
  emptyIcon?: ReactNode;           /** Custom empty icon */
  name?: string;                   /** aria-label for accessibility */
  getLabelText?: (value: number) => string; /** Text read by screen readers per value, e.g. "4 Stars" */
  className?: string;              /** Extra className hook */
}