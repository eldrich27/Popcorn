
import { type PropsWithChildren } from "react";




export function NavBar({ children }: PropsWithChildren) {
    
    return(
        <nav className="nav-bar">
            {children}
        </nav>
    )
}