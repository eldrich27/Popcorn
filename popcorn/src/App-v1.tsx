import { useEffect, useState } from "react";
import type { Movie } from "./types/Movie";
import { Rating, CustomHeart, CustomHeartOutline } from "./components/Rating";

import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { MovieList, WatchedMovieList } from "./components/List";
import { WatchedSummary } from "./components/WatchedSummary";
import { NumResult } from "./components/NumResult";


// key for omdb api
const KEY:string = "4fa905f8"

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched] = useState<Movie[]>([]);

  // const [value, setValue] = useState<number | null>(3);
  
  const api_uri = `https://www.omdbapi.com/?apikey=${KEY}`;
  const search = "Mega";

  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () => {
      const search_uri = `${api_uri}&s=${encodeURIComponent(search)}`;
      const res = await fetch(search_uri, { signal: controller.signal });

      if (!res.ok) {
        throw new Error(`Movie request failed: ${res.status}`);
      }

      const data: { Search?: Movie[] } = await res.json();
      setMovies(data.Search ?? []);
    };

    getMovies().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(error);
      setMovies([]);
    });

    return () => controller.abort();

  }, [api_uri, search]);



  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult movies={movies}/>
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
