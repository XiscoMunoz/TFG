import { useContext } from 'react';
import { perfilContexto } from '../Contextos/Perfilcontexto'; 


export const usePerfilContext = () => {
    const { perfilPersonal, setperfilPersonal } = useContext(perfilContexto);

    const cambiarValorPerfil = (valor) => {
        setperfilPersonal(valor);
    }
    return { perfilPersonal, cambiarValorPerfil };
};