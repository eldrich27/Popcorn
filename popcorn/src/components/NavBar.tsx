
import { type PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Search } from "./Search";



export function NavBar({ children }: PropsWithChildren) {
    
    return(
        <nav className="nav-bar">
            {children}
        </nav>
    )
}