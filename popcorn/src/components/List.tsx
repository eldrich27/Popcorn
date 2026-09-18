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

function WatchedMovieList({ watched }: { watched: Movie[] }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovieItem movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

export { MovieList, WatchedMovieList };
