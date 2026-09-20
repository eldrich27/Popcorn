import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";

// Configure VITE_OMDB_API_KEY in .env.local (never commit that file).
// Client-side environment variables are public; use a server proxy for a truly secret key.
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function MovieDetails({selectedID, onClose}:{selectedID:string; onClose:()=>void}){
    const [movieDetail, setMovieDetail] = useState<Movie | null>(null)

    useEffect(function(){
        async function getMovieDetail(id:Movie["imdbID"]) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`)
        }
    },[]);

    return(
        <div className="details">
            <button className="btn-back" onClick={onClose}>&larr;</button>
            {selectedID}
        </div>
    );
}