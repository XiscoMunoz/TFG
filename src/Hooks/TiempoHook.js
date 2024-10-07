import { useContext, useEffect } from 'react';
import { tiempoContexto } from '../Contextos/TiempoContexto';

export const useTiempoHook = () => {
    

    const {tiempo,horaInicial,horaFinal, setTiempo,setHoraInicial,setHoraFinal } = useContext(tiempoContexto);

    const cambiarValorTiempo = (valor) => {
        setTiempo(valor);
        localStorage.setItem('tiempo', valor);
    };

    const resetValorTiempo = () => {
        setTiempo(-1);
        localStorage.removeItem('tiempo');
    };

    const cambiarHoraInicial = (valor) => {
        setHoraInicial(valor);
        localStorage.setItem('horaInicial', valor);
    };

    const resetHoraInicial = () => {
        setHoraInicial(-1);
        localStorage.removeItem('horaInicial');
    };

    const cambiarHoraFinal = (valor) => {
        setHoraFinal(valor);
        localStorage.setItem('horaFinal', valor);
    };

    const resetHoraFinal = () => {
        setHoraFinal(-1);
        localStorage.removeItem('horaFinal');
    };

    return { tiempo,horaInicial,horaFinal, cambiarValorTiempo, resetValorTiempo,cambiarHoraInicial,cambiarHoraFinal,resetHoraInicial,resetHoraFinal };
};
/* const cambiarValorTiempo = (valor) => {
        setTiempo(valor);
    }
    const resetValorTiempo = () => {
        setTiempo(-1);
    }
    const cambiarHoraInicial = (valor) => {
        setHoraInicial(valor);
    }
    const resetHoraInicial = () => {
        setHoraInicial(-1);
    }
    const cambiarHoraFinal = (valor) => {
        setHoraFinal(valor);
    }
    const resetHoraFinal = () => {
        setHoraFinal(-1);
    } */