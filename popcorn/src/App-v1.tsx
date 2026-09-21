import { useCallback, useEffect, useState } from "react";
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

import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";


export default function App() {
  const [watched, setWatched] = useLocalStorage<Movie[]>('watched', []);
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null)

  //fucnction tohandle clic event on movies list
  function handleSelectedMovie(id: string){
    setSelectedId((selectedId)=> selectedId === id ? null : id)
  }

  // stable identity so it can be a safe effect dependency (here and in MovieDetails)
  const handleCloseMovie = useCallback(() => {
    setSelectedId(null)
  }, [])

  function handleAddMovie(movie: Movie){
    setWatched(watched => {
      const existingMovieIndex = watched.findIndex(
        watchedMovie => watchedMovie.imdbID === movie.imdbID
      );

      if (existingMovieIndex === -1) return [...watched, movie];

      const existingMovie = watched[existingMovieIndex];
      if (existingMovie.userRating === movie.userRating) return watched;

      const updatedWatched = [...watched];
      updatedWatched[existingMovieIndex] = movie;
      return updatedWatched;
    });
  }

  function handleDeleteWatched(id: Movie["imdbID"]){
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  const { error, isLoading, movies } = useMovies({
    query: query,
    callback:handleCloseMovie
  });

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
          {selectedId ? <MovieDetails 
            selectedID={selectedId} 
            onClose = {handleCloseMovie}
            onAdd = {handleAddMovie}
          />:<>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} onDelete={handleDeleteWatched} />
          </>}
        </Box>
      </Main>
    </>
  );
}