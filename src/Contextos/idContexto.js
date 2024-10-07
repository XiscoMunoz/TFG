import { useState, createContext, Children } from 'react';

export const idContexto = createContext()


export function SuministrarID({ children }) {

    const [idValor, setValor] = useState(() => {
        try {
            const item = localStorage.getItem('idUsuario');
            console.log('esto se actualiza')
            console.log(JSON.parse(item))
            return item ? JSON.parse(item): -1
        } catch {
            return -1;
        }

    });

    return (
        <idContexto.Provider value={{ idValor, setValor }}>
            {children}
        </idContexto.Provider>
    )
}
/*() => {
        try {
            const item = localStorage.getItem('idUsuario');
            console.log('esto se actualiza')
            console.log(JSON.parse(item))
            return item ? JSON.parse(item): -1
        } catch {
            return -1;
        }

    } */

