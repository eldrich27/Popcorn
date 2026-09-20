import { useEffect, useState } from "react";
import type { Movie } from "./types/Movie";

import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { MovieList, WatchedMovieList } from "./components/List";
import { WatchedSummary } from "./components/WatchedSummary";
import { NumResult } from "./components/NumResult";
import { Loading } from "./components/Loading";
import { Error as ErrorMessage } from "./components/Error";
import {MovieDetails } from "./components/MovieDetails";


// key for omdb api
const KEY:string = "4fa905f8"
const api_uri = `https://www.omdbapi.com/?apikey=${KEY}`;

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [query, setQuery] = useState<string>("interstellar");
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // const [value, setValue] = useState<number | null>(3);

  useEffect(() => {
    setError("")
    if (query.length < 4) {
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

    return () => controller.abort();

  }, [query]);


  //fucnction tohandle clic event on movies list
  function handleSelectedMovie(id: string){
    setSelectedId(selectedId === id ? null : id)
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies}/>
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && <MovieList 
            movies={movies} 
            onSelect={handleSelectedMovie}
          />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? <MovieDetails selectedID={selectedId} onClose = {handleCloseMovie}/>:<>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </>}
        </Box>
      </Main>
    </>
  );
}
