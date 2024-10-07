import React, { useEffect,useState } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';
import { CompmenIntermdio } from './CompMenIntermedio';

export const CompListadoMensajes = () => {

  const { idValor } = useIdContext();
  const [urlImagen, setUrlImagen] = useState(null);

  const { resultado, error, cargando, llamarApi } = useSqlHook('POST');

  useEffect(() => {
    llamarApi('http://localhost:1234/conversaciones', { idValor });
  }, []);

  return (
    <>
      {resultado.map(con => (
        <CompmenIntermdio foto_participante={con.foto_participante} nombre_participante={con.nombre_participante} id_chat={con.id_chat}></CompmenIntermdio>

      ))}
    </>
  )
}/*codigo antiguo sin css

<Link to={`${con.id_chat}`}>
        <p>
          Conversacion con: {con.nombre_participante}
      </p></Link>  








       <div>
          <div class='flex items-center justify-center '>
            <div class="rounded-xl border p-5 shadow-md w-full bg-yellow">
              <div class="flex w-full items-center justify-between">
              <Link to={`${con.id_chat}`}>
                <div class="flex items-center space-x-3">
                  {infoFoto(con.foto_participante)}
                  <img src={urlImagen} class="h-12 w-12 rounded-full bg-slate-400 "></img>
                  <div class="text-lg font-bold text-slate-700">{con.nombre_participante}</div>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
*/