import { useContext } from 'react';
import { postContexto } from '../Contextos/PostContexto'; 


export const usePostContext = () => {
    const { publicacion, setPublicacion } = useContext(postContexto);

    const cambiarValor = (valor) => {
        setPublicacion(valor);
    }
    return { publicacion, cambiarValor };
};