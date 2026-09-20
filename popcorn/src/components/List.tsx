import type { Movie } from "../types/Movie";
import { MovieItem, WatchedMovieItem } from "./Item";

function MovieList({
    movies,
    onSelect,
    onClose
}: {
    movies: Movie[];
    onSelect: (selectedID: Movie["imdbID"]) => void;
    onClose : () => void
}) {
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <MovieItem
                    movie={movie}
                    key={movie.imdbID}
                    onSelect={onSelect}
                    onClose = {onClose}
                />
            ))}
        </ul>
    );
}

function WatchedMovieList({ watched }: { watched: Movie[] }) {
    return (
        <ul className="list list-movies">
            {watched.map((movie) => (
                <WatchedMovieItem movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

export { MovieList, WatchedMovieList };
