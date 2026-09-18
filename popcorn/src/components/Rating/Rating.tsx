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
  const [index, setIndex] = useState(0);

    return (
        <div>
            {Array.from({ length: 10 }, (_, i) => (
                <span
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setIndex(i + 1)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                    setIndex(i + 1);
                    }
                }}
                >
                    <Star
                        filled={i < index ? 1 : 0}
                        icon={defaultIcon}
                        emptyIcon={defaultEmptyIcon}
                        size={36}
                    />
                </span>
            ))}
            <span>{index}</span>
        </div>
  );
}