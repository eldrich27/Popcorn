import { useState } from "react";
import type { Movie } from "../types/Movie";
import { MovieList, WatchedMovieList } from "./List";



function LeftBox({movies}:{movies:Movie[]}){
    
    const [isOpen1, setIsOpen1] = useState(true);
    return(
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && <MovieList movies={movies}/>}
        </div>
    );
}


function RightBox({watched}:{watched:Movie[]}) {
    
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && <WatchedMovieList watched={watched} />}
        </div>
    );
}


export {LeftBox, RightBox}