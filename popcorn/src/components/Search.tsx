import { useState } from "react";
import type { Movie } from "../types/Movie";

type SearchProps = {
    movies?: Movie[];
};

export function Search({ movies = [] }: SearchProps) {
    const [query, setQuery] = useState("");

    return (
        <>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </>
    );
}