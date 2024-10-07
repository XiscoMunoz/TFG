import React,{ useState, useEffect } from 'react';
import { conseguirArchivo } from '../FireBase/confing';

export const CompComentario = (props) => {

    const { contenido, fecha,correo,nombre,urlFoto} = props;

    const [urlFotoPerfil, setUrlFoto] = useState(null);

      useEffect(() => {
        conseguirArchivo(urlFoto).then(url => {
            setUrlFoto(url);
        })
    }, []);
      const formateoFecha = (input) => {

        const fecha = input.slice(0, 10);
        const hora = input.slice(11, 19);
        
        return (fecha + ' ' + hora)
    }
    
    return (
        
        <div class='flex items-center justify-center '>
            <div class="rounded-xl border p-5 shadow-md w-full bg-yellow">
                <div class="flex w-full items-center justify-between border-b pb-3">
                    
                    <div class="flex items-center space-x-3">
                    <img src={urlFotoPerfil} class="h-12 w-12 rounded-full bg-slate-400" alt=""></img>
                        <div class="text-lg font-bold text-slate-700">{nombre}</div>
                        <div class="text-xs text-neutral-500">{correo}</div>
                    </div>

                    <div class="flex items-center space-x-8">
                        <div class="text-xs text-neutral-500">{formateoFecha(fecha)}</div>
                    </div>
                </div>

                <div class="mt-4 mb-6"> 
                        <div class="text-sm text-neutral-600">{contenido}</div>
                </div>
            </div>
        </div>
        
    );
};/*CODIGO VIEJO SIN CSS 
<div>
                <p>Esto es un comentario de {nombre} con correo {correo}</p>
                <p>Contenido:{contenido}</p>
                <p>Fecha:{fecha}</p>
            </div>

*/