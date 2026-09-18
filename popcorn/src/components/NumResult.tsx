import type { Movie } from "../types/Movie";


export function NumResult({movies}:{movies:Movie[]}){
    return(
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}