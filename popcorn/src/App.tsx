import { useState } from "react";
import type { Movie } from "./types/Movie";

//importing components
import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { Main } from "./components/Main";
import { LeftBox, RightBox } from "./components/Box";



export default function App() {
  
  

  return (
    <>
      <NavBar>
        <Logo/>
        <Search />
      </NavBar>
      <Main >
        <LeftBox />
        <RightBox/>
      </Main>
    </>
  );
}
