import { useEffect } from "react";


interface useKeyProps{
  key:string;
  action : ()=>void
}

export function useKey({key, action}:useKeyProps){

  // Effect to listen to keydow events
    useEffect(function(){
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()){
                action
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [action, key]);

}


