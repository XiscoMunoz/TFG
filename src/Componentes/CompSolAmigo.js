import React, { useState,useEffect } from 'react';
import { useSqlHook } from '../Hooks/SqlHook';
import { conseguirArchivo } from '../FireBase/confing';

export const CompSolAmigo = (props) => {

  const { nombre, id,urlFoto,correo } = props;
  const [mostrarComponente, setMostrarComponente] = useState(true);
  const { resultado, error, llamarApi } = useSqlHook('POST');

  const [urlFotoPerfil, setUrlFoto] = useState(null);

  const toggleMostrarComponente = () => {
    setMostrarComponente(!mostrarComponente);
  };

  const eliminarAmigo = () => {
    llamarApi('http://localhost:1234/eliminarAmigos', { id })
    toggleMostrarComponente();
  }

  useEffect(() => {
    conseguirArchivo(urlFoto).then(url => {
        setUrlFoto(url);
    })
}, []);

  return (
    <>
      {mostrarComponente &&

        <div>
          <div class='flex items-center justify-center '>
            <div class="rounded-xl border p-5 shadow-md w-full bg-yellow">
              <div class="flex w-full items-center justify-between">
                
                <div class="flex items-center space-x-3">
                  <img src={urlFotoPerfil} class="h-12 w-12 rounded-full bg-slate-400" alt=""></img>
                  <div class="text-lg font-bold text-slate-700">{nombre}</div>
                  <div class="text-lg font-bold text-slate-700">{correo}</div>
                </div>
                <div class="flex items-center space-x-8">
                  <button onClick={() => eliminarAmigo()} class="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">ELIMINAR</button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>



  );
};/*CODIGO ANTIGUO SIN CSS

{mostrarComponente && <div>
        <p>Amigo : {nombre} <button onClick={()=>eliminarAmigo()}>ELIMINAR</button> </p>
      </div>}

*/