import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { Error as ErrorMessage } from "./Error";
import { Rating } from "./Rating";
import type { Movie } from "../types/Movie";
import { useKey } from "../hooks/useKey";

// Client-side environment variables are public; use a server proxy for a truly secret key.
const OMDB_URL: string = import.meta.env.VITE_OMDB_URL;

// OMDb returns every field as a string, so this differs from the list's Movie type.
interface MovieDetail {
    Title: string;
    Year: string;
    Poster: string;
    Runtime: string;
    Genre: string;
    Released: string;
    imdbRating: string;
    Plot: string;
    Actors: string;
    Director: string;
    Response: string;
    Error?: string;
}

export function MovieDetails({ 
    selectedID, 
    onClose,
    onAdd
}: { 
    selectedID: string; 
    onClose: () => void;
    onAdd: (movie: Movie) => void
}) {
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [userRating, setUserRating] = useState<number | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function getMovieDetail() {
            setIsLoading(true);
            setError("");
            setMovieDetail(null);
            setUserRating(null);

            const res = await fetch(`${OMDB_URL}&i=${encodeURIComponent(selectedID)}`, {
                signal: controller.signal,
            });
            if (!res.ok) throw new Error(`Movie request failed: ${res.status} ${res.statusText}`);

            const data: MovieDetail = await res.json();
            if (data.Response === "False") throw new Error(data.Error ?? "Movie not found.");

            setMovieDetail(data);
        }

        getMovieDetail()
            .catch((err: unknown) => {
                if (err instanceof DOMException && err.name === "AbortError") return;
                console.error(err);
                setError(err instanceof Error ? err.message : String(err));
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsLoading(false);
            });

        return () => controller.abort();
    }, [selectedID]);


    

    // destructuring the moviedetails object to receive values in lower case
    const {
        Title: title,
        Poster: poster,
        Runtime: runtime,
        Genre: genre,
        Released: released,
        imdbRating: imdbrating,
        Plot: plot,
        Actors: actors,
        Director: director,
        Year : year,
        
    }: Partial<MovieDetail> = movieDetail ?? {};


    function handleAdd(){
        // keys must match the Movie type; OMDb sends "N/A" for missing numbers, hence `|| 0`
        const newWatchedMovie: Movie = {
            imdbID: selectedID,
            Title: title ?? "",
            Year: year ?? "",
            Poster: poster ?? "",
            imdbRating: Number(imdbrating) || 0,
            runtime: Number(runtime?.split(" ").at(0)) || 0,
            userRating: userRating ?? 0,
        }
        onAdd(newWatchedMovie)
        onClose()
    }

    // Effect to set and unset page title on clicking the movie list for details
    useEffect(() => {
        document.title = title? `Movie | ${title}` : "";

        return function(){
            document.title = "usePopcorn"
        }
    }, [title]);


    // Effect to listen to keydow events
    useKey({key: "Escape", action: onClose})
    // useEffect(function(){
    //     const callback = (e: KeyboardEvent) => {
    //         if (e.code === "Escape"){
    //             onClose()
    //         }
    //     }

    //     document.addEventListener("keydown", callback);
    //     return () => document.removeEventListener("keydown", callback);
    // }, [onClose]);

    return (
        <div className="details">
            <button className="btn-back" onClick={onClose}>&larr;</button>
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && movieDetail && (
                <>
                    <header>
                        <img src={poster} alt={`${title} poster`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>{imdbrating} IMDb rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating" style={{ fontSize: "24px" }}>
                            <Rating
                                max={10}
                                value={userRating}
                                precision={0.5}
                                showValue
                                onChange={(_, value) => setUserRating(value)}
                            />
                            
                        </div>
                        {userRating && <button className="btn-add"
                        onClick={handleAdd}>Add to the List</button>}
                        
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
