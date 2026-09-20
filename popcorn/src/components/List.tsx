import type { Movie } from "../types/Movie";
import { MovieItem, WatchedMovieItem } from "./Item";

function MovieList({
    movies,
    onSelect
}: {
    movies: Movie[];
    onSelect: (selectedID: Movie["imdbID"]) => void;
}) {
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <MovieItem
                    movie={movie}
                    key={movie.imdbID}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    );
}

function WatchedMovieList({
    watched,
    onDelete
}: {
    watched: Movie[];
    onDelete: (id: Movie["imdbID"]) => void;
}) {
    return (
        <ul className="list list-movies">
            {watched.map((movie) => (
                <WatchedMovieItem movie={movie} key={movie.imdbID} onDelete={onDelete} />
            ))}
        </ul>
    );
}

export { MovieList, WatchedMovieList };
