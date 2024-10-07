import { useState,createContext, Children } from 'react';

export const tiempoContexto = createContext()


export function SuministrarTiempo({children}){

    const [tiempo, setTiempo] = useState(() => {
        try {
            const item = localStorage.getItem('tiempo');
            console.log('tiempo se actualiza')
            console.log(JSON.parse(item))
            return item ? JSON.parse(item): -1
        } catch {
            return -1;
        }

    });
    const [horaInicial, setHoraInicial] = useState(() => {
        try {
            const item = localStorage.getItem('horaInicial');
            console.log('horaInicial se actualiza')
            console.log(JSON.parse(item))
            return item ? JSON.parse(item): -1
        } catch {
            return -1;
        }

    });
    const [horaFinal, setHoraFinal] = useState(() => {
        try {
            const item = localStorage.getItem('horaFinal');
            console.log('horaFinal se actualiza')
            console.log(JSON.parse(item))
            return item ? JSON.parse(item): -1
        } catch {
            return -1;
        }

    });

    return(
        <tiempoContexto.Provider value={{tiempo,setTiempo,horaFinal,setHoraFinal,horaInicial,setHoraInicial}}>
            {children}
        </tiempoContexto.Provider>
    )
}
