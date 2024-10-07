import { useContext,useEffect } from 'react';
import { idContexto } from '../Contextos/idContexto';


export const useIdContext = () => {
    const { idValor, setValor } = useContext(idContexto);

    const cambiarValor = (valor) => {
        setValor(valor);
        localStorage.setItem('idUsuario', valor);
    };

    const resetValor = () => {
        setValor(-1);
        localStorage.removeItem('idUsuario');
    };

    return { idValor, cambiarValor, resetValor };
};

/**version vieja
 * 
 * 
 * const cambiarValor = (valor) => {
        setValor(valor);
    }
    const resetValor = () => {
        setValor(-1);
    }
 */