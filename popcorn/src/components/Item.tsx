import type { Movie } from "../types/Movie"

function MovieItem({
    movie,
    onSelect
}: {
    movie: Movie, 
    onSelect:(selectedId :Movie["imdbID"])=>void
}){
    return(
        <li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
            </div>
        </li>
    )
}

function WatchedMovieItem({movie}:{movie:Movie}){
    return(
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    )
}

export {MovieItem, WatchedMovieItem}