import { Children, useState, type PropsWithChildren } from "react";
import type { Movie } from "../types/Movie";




export function Main({children }:PropsWithChildren){

    return(
        <main className="main">
        {children}
        </main>
    )
}