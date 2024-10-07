import React, {useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';

export const CompCredenciales = () => {

    const { idValor } = useIdContext();

    const { resultado, error, llamarApi } = useSqlHook('POST');

    const cambiarCredenciales = (event) => {

        event.preventDefault();
        const campos = Object.fromEntries(new window.FormData(event.target))
        llamarApi('http://localhost:1234/cambioCredenciales', { campos,idValor })
    }
    useEffect(()=>{
        if ( ! resultado.estado) {
            if(resultado.estado===false){
                alert('Correo en uso por otra persona')
            }
        }
    },[resultado])

    return (
       <div class="ml-4">
        <form onSubmit={e => cambiarCredenciales(e)} class="grid grid-cols-7 grid-rows-4 " >

        
        <label for="correo" class="col-start-1 ">Correo:</label>
        <input id="correo" name="correo" placeholder="Nuevo correo"  class="col-start-2"></input>
        

        
        <label for="contraseña"  class="col-start-1">Contraseña:</label>
        <input id="contraseña" name="contraseña" placeholder="Nueva contraseña"  class="col-start-2"></input>
        
       
      
        <label for="nombre"  class="col-start-1">Nombre:</label>
        <input id="nombre" name="nombre" placeholder="Nuevo nombre" class="col-start-2"></input>
     

      
        <button type="submit"  class="col-start-1"> Cambiar </button>
     
        </form>
       
       </div>
    );
};