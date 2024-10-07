import React, { useRef, useState, useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks';
import { useSqlHook } from '../Hooks/SqlHook';
import { useTiempoHook } from '../Hooks/TiempoHook';
import { useNavigate } from 'react-router-dom';

export default function Temporizador() {

    const { idValor } = useIdContext();
    const { tiempo,horaFinal,horaInicial, resetHoraFinal, resetHoraInicial, resetValorTiempo } = useTiempoHook();

    const { resultado, error, llamarApi } = useSqlHook('POST');

    const [cuentaAtras, setCuentaAtras] = useState(tiempo)
    const cuentaAtrasID = useRef()
    const cuentaAtrasRef = useRef(cuentaAtras);
    const navigate = useNavigate();


    const formateoTiempo = (tiempo) => {
        let horas = Math.floor(tiempo / 3600);
        let minutos = Math.floor((tiempo % 3600) / 60);
        let segundos = Math.floor(tiempo % 60);
        const horaActual = new Date().getHours();

    
        if (horas < 10) horas = '0' + horas;
        if (minutos < 10) minutos = '0' + minutos;
        if (segundos < 10) segundos = '0' + segundos;
    
        return (
            <div class="mt-12 flex flex-col items-center mt-24 ml-2 ">
                <div class="flex items-center justify-center space-x-4 mt-4">
                    <div class="flex flex-col items-center px-4">
                        <span class="text-2xl ">{horas}</span>
                    </div>
                    <span class="w-[1px] h-12 bg-gray-400"></span>
                    <div class="flex flex-col items-center px-4">
                        <span class="text-2xl  ">{minutos}</span>
                    </div>
                    <span class="w-[1px] h-12 bg-gray-400"></span>
                    <div class="flex flex-col items-center px-4">
                        <span class="text-2xl  ">{segundos}</span>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        cuentaAtrasID.current = setInterval(() => {
            setCuentaAtras(prev => prev - 1);
            cuentaAtrasRef.current = cuentaAtrasRef.current - 1;
        }, 1000)
        return () => clearInterval(cuentaAtrasID.current)
    }, []);

    
        useEffect(() => {
      
          const tiempoActual = () => {
            localStorage.setItem('tiempo', cuentaAtrasRef.current);
            llamarApi('http://localhost:1234/actualizaTiempo', { idValor, tiempo: cuentaAtrasRef.current });
          };
      
          window.addEventListener('unload', tiempoActual);
      
          return () => {
            window.removeEventListener('unload', tiempoActual);
          };
        }, []);

    useEffect(() => {

        const horaActual = new Date().getHours();
        if (horaActual >= horaInicial && horaActual < horaFinal) {
            navigate('/inicioSesion');
        }
        if (cuentaAtras <= 0) {
            clearInterval(cuentaAtrasID.current)
            navigate('/inicioSesion');
            llamarApi('http://localhost:1234/actualizaTiempo', { idValor, tiempo: cuentaAtrasRef.current });
        }
    }, [cuentaAtras]);

    useEffect(() => {
        return () => {
            llamarApi('http://localhost:1234/actualizaTiempo', { idValor, tiempo: cuentaAtrasRef.current });
        };
    }, []);

    return (
        formateoTiempo(cuentaAtras)
    )

}