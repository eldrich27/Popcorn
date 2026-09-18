import { useState } from "react";
import { Star } from "./Star";


const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
const defaultEmptyIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" style={{ opacity: 0.35 }}>
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export function Rating(){
    return (
        <div>
            <h1>Hellow from ratigs</h1>
          <span style={{ width: "24px", height: "24px", display: "inline-block" }}>{defaultIcon}</span>
            <span style= {{ width: "24px", height: "24px", display: "inline-block" }}>{defaultEmptyIcon}</span>
        </div>
    )
}