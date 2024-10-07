import { useState,createContext, Children } from 'react';

export const postContexto = createContext()


export function SuministrarPost({children}){

    const [publicacion, setPublicacion] = useState(false);


    return(
        <postContexto.Provider value={{publicacion,setPublicacion}}>
            {children}
        </postContexto.Provider>
    )
}