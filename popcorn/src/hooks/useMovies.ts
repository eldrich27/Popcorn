import { useEffect, useRef, useState } from "react";
import type { Movie } from "../types/Movie";


interface UseMovieProps {
  query : string;
  callback ? : ()=>void
}

// key for omdb api
// const KEY:string = import.meta.env.VITE_OMDB_API_KEY
const api_uri:string = import.meta.env.VITE_OMDB_URL;

export function useMovies({query,callback}:UseMovieProps){
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  // the ref always holds the latest callback, so the fetch effect doesn't need it as a dependency
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    setError("")
    callbackRef.current?.()
    if (query.length <= 2) {
      setMovies([])
      setIsLoading(false)
      return;
    }
    setIsLoading(true)
    const controller = new AbortController();

    const getMovies = async () => {
      const search_uri = `${api_uri}&s=${encodeURIComponent(query)}`;
      const res = await fetch(search_uri, { signal: controller.signal });

      if (!res.ok) {
        setError(`Movie request failed: ${res.status} ${res.statusText}`);
        setMovies([]);
        return;
      }

      const data: { Search?: Movie[]; Error?: string } = await res.json();

      if (data.Error || !data.Search) {
        setMovies([]);
        setError(data.Error ?? "No movies were returned.");
        return;
      }

      setMovies(data.Search);
      
    };
    getMovies().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(error);
      setMovies([]);
      setError(error instanceof Error ? error.message : String(error));
    }).finally(() => {
      // an aborted request must not clear the loading flag of the newer one
      if (!controller.signal.aborted) setIsLoading(false);
    });

    return () => {
      controller.abort();
    } 

  }, [query]);

  return { movies, isLoading, error };
}