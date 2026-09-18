// components/Rating/CustomHeart.tsx
const heartPath =
  "M12 21s-6.716-4.35-9.428-8.014C.29 9.706 1.02 5.75 4.5 4.09 7.2 2.79 9.9 3.9 12 6.3c2.1-2.4 4.8-3.51 7.5-2.21 3.48 1.66 4.21 5.616 1.928 8.896C18.716 16.65 12 21 12 21z";

export function CustomHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d={heartPath} />
    </svg>
  );
}

export function CustomHeartOutline() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      color="#000"
      width="100%"
      height="100%"
    >
      <path d={heartPath} />
    </svg>
  );
}
