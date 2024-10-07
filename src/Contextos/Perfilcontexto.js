import { useState,createContext, Children } from 'react';

export const perfilContexto = createContext()


export function SuministrarPerfil({children}){

    const [perfilPersonal, setperfilPersonal] = useState(-1);


    return(
        <perfilContexto.Provider value={{perfilPersonal,setperfilPersonal}}>
            {children}
        </perfilContexto.Provider>
    )
}