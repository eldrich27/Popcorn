import { useState } from "react";
import type { Movie } from "../types/Movie";

type SearchProps = {
    movies?: Movie[];
};

export function Search({ movies = [] }: SearchProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`search-group${isOpen ? " search-group-open" : ""}`}>
            <input
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