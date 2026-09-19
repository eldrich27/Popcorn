import { useState } from "react";
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


const tempMovieData: Movie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData: Movie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
// key for omdb api
const KEY:string = "4fa905f8"

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched] = useState<Movie[]>([]);

  const [value, setValue] = useState<number | null>(3);

  fetch(
    `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY ?? KEY
    }&s=${encodeURIComponent("harry potter")}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data.Search));


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


// Template code for ratings component

//  <div>
//       {/* Basic */}
//       <Rating defaultValue={2.5} precision={0.5} />
//     </div>
//     <div>
//       {/* Controlled ratings share the same value, so selecting either updates both. */}
//       <Rating
//         value={value}
//         onChange={(_, v) => setValue(v)}
//         onChangeActive={(_, v) => console.log(`hovering ${v}`)}
//       />
//       <p> Controlled rating</p>
//       <Rating value={value} readOnly onChange={(_, v) => setValue(v) } />
//       <p>{value !== null ? `${value} stars` : "No rating"}</p>
//     </div>
      
//     <div>
//       {/* Custom API surface: custom heart icon, highlightSelectedOnly, vertical orientation */}
//       <Rating
//         max={5}
//         size="large"
//         // highlightSelectedOnly
//         getLabelText={(v) => `${v}/10`}
//         icon={<CustomHeart />}
//         emptyIcon={<CustomHeartOutline />}
//       />
//     </div>
//       <Rating disabled />