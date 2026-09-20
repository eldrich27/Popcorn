import type { Movie } from "../types/Movie";

const average = (values: number[]) =>
    values.reduce((total, value) => total + value, 0) / (values.length || 1);

// "8.5" style, one decimal for every rating
const formatRating = (value: number) => value.toFixed(1);

// 148.33 -> "2h 28m", 45 -> "45m"
function formatRuntime(minutes: number) {
    const total = Math.round(minutes);
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export function WatchedSummary({ watched }: { watched: Movie[] }) {
    const isEmpty = watched.length === 0;
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating ?? 0));
    const avgUserRating = average(watched.map((movie) => movie.userRating ?? 0));
    const avgRuntime = average(watched.map((movie) => movie.runtime ?? 0));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>
                        {watched.length} {watched.length === 1 ? "movie" : "movies"}
                    </span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{isEmpty ? "–" : formatRating(avgImdbRating)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{isEmpty ? "–" : formatRating(avgUserRating)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{isEmpty ? "–" : formatRuntime(avgRuntime)}</span>
                </p>
            </div>
        </div>
    );
}
