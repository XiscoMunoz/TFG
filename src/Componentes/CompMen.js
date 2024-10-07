import React, { useState, useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { conseguirArchivo } from '../FireBase/confing';

export const CompMen = ({ contenido, id, tipo }) => {

    const { idValor } = useIdContext();

    const [urlImagen, setUrlImagen] = useState(null);

    const isMensajeActual = id === idValor;



    useEffect(() => {
        if (tipo === 'imagen') {
            conseguirArchivo(contenido).then(url => {
                setUrlImagen(url);
            })
        }
    }, []);

    return (
        <>
            <div className={`mb-2 ${isMensajeActual ? 'text-right' : ''}`}>
                {tipo === 'texto' && (
                    <p className={`rounded-lg py-2 px-4 inline-block ${isMensajeActual ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-700 mr-auto'}`}>
                        {contenido}
                    </p>
                )}
                {tipo === 'imagen' && (
                    <div className={`inline-block ${isMensajeActual ? 'text-right' : 'text-left'} ${isMensajeActual ? 'ml-auto' : 'mr-auto'}`}>
                        <img src={urlImagen} width='300' height='300' alt="Imagen" />
                    </div>
                )}
            </div>
        </>
    );
};