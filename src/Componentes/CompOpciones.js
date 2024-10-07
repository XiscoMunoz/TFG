import React, { useEffect, useState } from 'react'
import { useIdContext } from '../Hooks/IDhooks';
import { useSqlHook } from '../Hooks/SqlHook';
import { CompVentanaOpciones } from './CompVentanaOpciones';
import { CompCredenciales } from './CompCredenciales';


export const CompOpciones = () => {

    const { idValor } = useIdContext();
    const { resultado, error, llamarApi } = useSqlHook('POST');
    const [borroso, setBorroso] = useState(null);
    const [horario, setHoraio] = useState(null);
    const [credenciales, setcredenciales] = useState(null);
    const [fijo, setfijo] = useState(null);

    function imagenBorrosa() {
        const toggleButton = document.getElementById('opcion');

        if (toggleButton.checked) {
            console.log('boton si')
            setBorroso(true);
            llamarApi('http://localhost:1234/actuOpciones/borrosa', { idValor, valor: true })
        } else {
            console.log('boton no')
            setBorroso(false);
            llamarApi('http://localhost:1234/actuOpciones/borrosa', { idValor, valor: false })
        }
    }
    function cambioHorario() {
        const toggleButton = document.getElementById('horario');
        console.log(fijo)
        if (!fijo) {
            setHoraio(toggleButton.checked);
        }

    }
    function cambioCredenciales() {
        const toggleButton = document.getElementById('credenciales');
        setcredenciales(toggleButton.checked);
    }

    useEffect(() => {
        llamarApi('http://localhost:1234/opcinoesUsu', { idValor })
    }, [])

    useEffect(() => {
        if (resultado.length > 0) {
            if (resultado[0].borrosa === 1) {
                setBorroso(true);
            } else {
                setBorroso(false)
            }
            if (resultado[0].horario === 1) {
                setHoraio(true);
                setfijo(true)
            } else {
                setHoraio(false)
                setfijo(false)
            }
        }
    }, [resultado])

    return (
        <div >
            <div class="p-4">
                <input class="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5 mr-4" type="checkbox" id="opcion" name="opcion" checked={borroso} onClick={imagenBorrosa}></input>
                <span >Fotos borrosas</span>
            </div>
            <div class="p-4">
                <input class="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5 mr-4" type="checkbox" id="horario" name="horario" checked={horario} onClick={cambioHorario}></input>
                <span>Horario de uso</span>
            </div>
            {horario && <CompVentanaOpciones opcion={fijo}></CompVentanaOpciones>}
            <div class="p-4">
                <input class="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5 mr-4" type="checkbox" id="credenciales" name="credenciales" checked={credenciales} onClick={cambioCredenciales}></input>
                <span>Cambiar credenciales</span>
            </div>
            {credenciales && <CompCredenciales></CompCredenciales>}
        </div>
    )
}