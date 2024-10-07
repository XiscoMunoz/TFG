import React, { useState, useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { CompSol } from './CompSol'
import { CompVentana } from './CompVentana';
import { useSqlHook } from '../Hooks/SqlHook';


export const CompSolicitudes = () => {

  const { idValor } = useIdContext();

  const { resultado, error, llamarApi } = useSqlHook('POST');


  const conseguirSolicitudes = () => {
    llamarApi('http://localhost:1234/solicitudes/recibir', { idValor });
  }

  useEffect(() => {
    conseguirSolicitudes();
  }, []);

  return (
    <div class="mt-24">
      {resultado.length > 0 ? (
        resultado.map(sol => (
          <CompSol key={sol.id_solicitud} idUsu={sol.id_usuario_envia} idSol={sol.id_solicitud} nombre={sol.nombre} urlFoto={sol.foto} correo={sol.correo}></CompSol>
        ))
      ) : (
        <p>No tiene solicitudes pendientes</p>
      )}
    </div>
  )
}/*CODIGO VIEJO SIN CSS 



*/