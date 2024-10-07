import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useIdContext } from '../Hooks/IDhooks'
import { useTiempoHook } from '../Hooks/TiempoHook';

export const CompNuevoUsuario = () => {

    const navigate = useNavigate();

    const { cambiarValor } = useIdContext();
    const { cambiarValorTiempo } = useTiempoHook();

    const EnviarInformacion = (event) => {
        event.preventDefault();
        const campos = Object.fromEntries(new window.FormData(event.target))
        console.log(campos)

        if (!campos.nombre || !campos.contraseña || !campos.correo) {
            alert('Por favor completa todos los campos.');
            return;
        }

        fetch('http://localhost:1234/login/nuevoUsuario', {//hacer lo del fetch en un hook propio
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
                
                cambiarValorTiempo(7200)
                cambiarValor(data[0].id_usuario)
                navigate('/home')
            
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Correo ya en uso')
            });
    };

    return (

        <>
            <div className="col-span-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={e => EnviarInformacion(e)}>

                    <label for="nombre" classNameName="label-inicial">Nombre</label>
                    <input id="nombre" name="nombre" required className="input-inicial"></input>

                    <label for="correo" classNameName="label-inicial">Correo</label>
                    <input id="correo" name="correo" required className="input-inicial"></input>

                    <label for="contraseña" className="label-inicial">Contraseña</label>
                    <input id="contraseña" type="password" name="contraseña" required className="input-inicial"></input>

                    <div className="grid gap-4">
                        <button type="submit" className="botones-inicial">Continuar</button>
                        <Link to="/"> <button className="botones-inicial"> Atras</button></Link>
                    </div>

                </form>
            </div>
        </>
    )
}
/*CODIGO ANTIGUO SIN CSS

<div>
                <div>
                    <form onSubmit={e => EnviarInformacion(e)}>
                        <label>
                            Nombre:
                            <input type="text" name='nombre' />
                        </label>
                        <label>
                            Contraseña:
                            <input type="text" name='contraseña' />
                        </label>
                        <label>
                            Correo:
                            <input type="text" name='correo' />
                        </label>
                        <Link to="/login"><button> Atras</button></Link>
                        <button typue='submit'> Continuar</button>
                    </form>
                </div>
            </div>
*/