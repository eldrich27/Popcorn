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

  const [value, setValue] = useState<number | null>(3);


  
  const api_uri = `https://www.omdbapi.com/?apikey=${KEY}`
  const search = "War"
  
  useEffect(function () {
    const getMovies = async function ({api_uri, search}:{api_uri:string, search:string}):Promise<any>{
      const search_uri = api_uri + '&s=' + encodeURIComponent(search);
      const res = await fetch(search_uri);
      const data = await res.json();
      return data
    }

    getMovies({ api_uri, search }).then((data) => {
      setMovies(data.Search ?? []);
    });
    // fetch(
    //   `https://www.omdbapi.com/?apikey=${
    //     import.meta.env.VITE_OMDB_API_KEY ?? KEY
    //   }&s=${encodeURIComponent("Interstellar")}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => setMovies(data.Search));

  },[])




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