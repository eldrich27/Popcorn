import { useEffect } from "react";


interface useKeyProps{
  key:string;
  action : ()=>void
}

export function useKey({key, action}:useKeyProps){

  // Effect to listen to keydow events
    useEffect(function(){
        const callback = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()){
                action
            }
        }

        document.addEventListener("keydown", callback);
        return () => document.removeEventListener("keydown", callback);
    }, [action, key]);
}