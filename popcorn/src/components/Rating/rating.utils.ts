// components/Rating/rating.utils.ts
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Round to the nearest step of `precision` */
export const roundToPrecision = (
  value: number,
  precision: number
) => Math.round(value / precision) * precision;

export const defaultGetLabelText = (value: number) =>
  `${value} Star${value !== 1 ? "s" : ""}`;

export const SIZE_MAP = { small: 20, medium: 28, large: 36 } as const;