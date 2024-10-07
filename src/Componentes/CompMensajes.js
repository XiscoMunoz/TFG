import React, { useEffect } from 'react';
import { Outlet, useNavigate,useLocation   } from 'react-router-dom'
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';

export const CompMensajes = () => {

  const { idValor } = useIdContext();
  const { resultado, error, llamarApi } = useSqlHook('POST');
  const navigate  = useNavigate();
  const location = useLocation();
  const esConversacion = location.pathname.includes('/mensajes/listado/');

  function crearConversacion() {

    const correo = document.getElementById('correo').value
    llamarApi('http://localhost:1234/nuevaConversacion', { idValor, correo })
  }
  useEffect(() => {
    if (resultado.length > 0){
      navigate(`/mensajes/listado/${resultado[0].id_Chat}`);}
  }, [resultado]);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div class="mt-24 ">

      {!esConversacion && (
        <div>
          <input type="text" id="correo" placeholder="Escriba el correo" />
          <button onClick={() => crearConversacion()}>Enviar</button>
        </div>
      )}

        <Outlet>
        </Outlet>
      </div>
    </>
  )
}/** */