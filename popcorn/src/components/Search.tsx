import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { flushSync } from "react-dom";
import { useKey } from "../hooks/useKey";



export function Search({query, setQuery}:{query:string, setQuery: Dispatch<SetStateAction<string>>}) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEnter = ()=>{
        const active = document.activeElement;
        if (active instanceof HTMLElement && ["INPUT", "TEXTAREA", "BUTTON"].includes(active.tagName)) return;

        setQuery("");
        // render the input first (it is hidden on mobile until open), then focus it
        flushSync(() => setIsOpen(true));
        inputRef.current?.focus();

    }

    // Using hhooks fo keydown events
    useKey({ key: "Enter", action: handleEnter });

    return (
        <div className={`search-group${isOpen ? " search-group-open" : ""}`}>
            <input
                ref={inputRef}
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="search-toggle"
                type="button"
                aria-label="Search movies"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
                </svg>
            </button>
        </div>
    );
}