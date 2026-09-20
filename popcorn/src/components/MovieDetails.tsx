import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { Error as ErrorMessage } from "./Error";

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

export function MovieDetails({ selectedID, onClose }: { selectedID: string; onClose: () => void }) {
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const controller = new AbortController();

        async function getMovieDetail() {
            setIsLoading(true);
            setError("");
            setMovieDetail(null);

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

    return (
        <div className="details">
            <button className="btn-back" onClick={onClose}>&larr;</button>
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {movieDetail && (
                <>
                    <header>
                        <img src={movieDetail.Poster} alt={`${movieDetail.Title} poster`} />
                        <div className="details-overview">
                            <h2>{movieDetail.Title}</h2>
                            <p>{movieDetail.Released} &bull; {movieDetail.Runtime}</p>
                            <p>{movieDetail.Genre}</p>
                            <p><span>⭐️</span>{movieDetail.imdbRating} IMDb rating</p>
                        </div>
                    </header>
                    <section>
                        <p><em>{movieDetail.Plot}</em></p>
                        <p>Starring {movieDetail.Actors}</p>
                        <p>Directed by {movieDetail.Director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
