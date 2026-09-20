import type { Movie } from "../types/Movie";

const average = (values: number[]) =>
    values.reduce((total, value) => total + value, 0) / (values.length || 1);

export function WatchedSummary({ watched }: { watched: Movie[] }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating ?? 0)).toFixed(2);
    const avgUserRating = average(watched.map((movie) => movie.userRating ?? 0)).toFixed(2);
    const avgRuntime = average(watched.map((movie) => movie.runtime ?? 0));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}
