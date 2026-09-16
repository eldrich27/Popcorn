import { useState } from "react";
import type { Movie } from "./types/Movie";

//importing components
import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";



export default function App() {
  
  

  return (
    <>
      
      <NavBar>
        <Logo/>
        <Search />
      </NavBar>
      
    </>
  );
}
