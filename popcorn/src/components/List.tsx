import type { Movie } from "../types/Movie"
import { MovieItem, WatchedMovieItem } from "./Item"

function MovieList({movies}: { movies: Movie[] }){
    return(
        <ul className="list">
            {movies?.map((movie) => (
             <MovieItem movie={movie} key={movie.imdbID}/>
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