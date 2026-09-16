import type { Movie } from "../types/Movie"

function MovieList({movies}: { movies: Movie[] }){
    return(
        <ul className="list">
            {movies?.map((movie) => (
            <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
                </div>
            </li>
            ))}
        </ul>
    )
}

function WatchedMovieList(){
    return(
        <h1>Watched Movie List</h1>
    )
}


export {MovieList, WatchedMovieList}