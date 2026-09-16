import type { Movie } from "../types/Movie";
import { MovieItem, WatchedMovieItem } from "./Item";

function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <ul className="list">
            {movies.map((movie) => (
                <MovieItem movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

const average = (values: number[]) =>
    values.reduce((total, value) => total + value, 0) / (values.length || 1);

function WatchedMovieList({ watched }: { watched: Movie[] }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating ?? 0));
    const avgUserRating = average(watched.map((movie) => movie.userRating ?? 0));
    const avgRuntime = average(watched.map((movie) => movie.runtime ?? 0));

    return (
        <>
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

            <ul className="list">
                {watched.map((movie) => (
                    <WatchedMovieItem movie={movie} key={movie.imdbID}/>
                ))}
            </ul>
        </>
    );
}

export { MovieList, WatchedMovieList };
