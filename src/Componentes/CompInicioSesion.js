import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';
import { useTiempoHook } from '../Hooks/TiempoHook';


export const CompInicioSesion = () => {

    const navigate = useNavigate();

    const { cambiarValor } = useIdContext();
    const { tiempo,horaInicial,horaFinal, cambiarValorTiempo,cambiarHoraFinal,cambiarHoraInicial } = useTiempoHook();
    const [ver,setVer]=useState(false)

    //const { resultado, error, cargando, llamarApi } = useSqlHook('http://localhost:1234/login/inicioSesion', 'POST');

    const enviarInformacion = (event) => {

        event.preventDefault();
        const campos = Object.fromEntries(new window.FormData(event.target))
        /* llamarApi(campos)
         if (resultado.length === 0) {
             alert('no existe el usuario')
             return;
         }
         cambiarValor(resultado[0].id_usuario)
         navigate('/home')*/

        fetch('http://localhost:1234/login/inicioSesion', {//hacer lo del fetch en un hook propio
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                
                return response.json();
            })
            .then(data => {
                console.log(data)

                if (data.estado) {//data.length === 0
                    alert('No se ha encontrado al usuario')
                    return;
                }
                if (data[0].tiempo <= 0) {
                    alert('Tiempo de uso agotado')
                    return;
                }
                cambiarValorTiempo(data[0].tiempo)
                cambiarHoraFinal(data[0].horaFinal)
                cambiarHoraInicial(data[0].horaInicial)
                setVer(true)
                cambiarValor(data[0].id_usuario)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    function cambioContraseña() {

        const correo = document.getElementById('correo').value;
   
        fetch('http://localhost:1234/cambioPassword', {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({correo})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los usuarios');
                    }
                    return response.json();
                })
                .then(data => {
                  if(!data.estado){
                    alert('Correo no valido o no existente')
                  }
                })
                .catch(error => {
                    console.log(error)
                });
      }

      

    useEffect(() => {
        const horaActual = new Date().getHours();
        if (horaActual >= horaInicial && horaActual < horaFinal) {
            alert('Hora restringida');
        } else if (ver && tiempo > 0) {
            navigate('/home');
        }
    }, [tiempo]);

    return (

        <>

            <div className=" col-span-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={e => enviarInformacion(e)}>

                    <label for="correo" className="label-inicial">Correo</label>
                    <input id="correo" name="correo" required className="input-inicial"></input>

                    <label for="contraseña" className="label-inicial">Contraseña</label>
                    <input id="contraseña" type="password" name="contraseña" required className="input-inicial"></input>
                    <label class="text-sm font-semibold text-blue-500" onClick={cambioContraseña}>Contraseña olvidada?</label>

                    <div className="grid gap-4">
                        <button type="submit" className="botones-inicial">Continuar</button>
                        <Link to="/"> <button className="botones-inicial"> Atras</button></Link>
                    </div>

                </form>
                
            </div>
            
        </>
    )
}
/* CODIGO VIEJO SIN CSS 

<div>
                <form onSubmit={e => enviarInformacion(e)}>
                    <label>
                        Correo: <input name='correo' />
                    </label>
                    <label>
                        Contraseña: <input name='contraseña' />
                    </label>

                    <button type='submit'> Continuar</button>
                </form>
                <Link to="/login"> <button> Atras</button></Link>
            </div>

*/