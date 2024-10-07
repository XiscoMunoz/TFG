import React, { useState,useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks';
import { useSqlHook } from '../Hooks/SqlHook';
import { useTiempoHook } from '../Hooks/TiempoHook';


export function CompVentanaOpciones({ opcion }) {

    const horas = Array.from({ length: 25 }, (_, index) => index);
    const { idValor } = useIdContext();
    const { resultado, error, llamarApi } = useSqlHook('POST');
    const { horaFinal, horaInicial,cambiarHoraFinal,cambiarHoraInicial } = useTiempoHook();
    const [mostrar, setMostrar] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [textInput, setTextInput] = useState('');
    const [file, setFile] = useState(null);
    const [tipo, setTipo] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setTextInput(value);
        setTipo('texto')
    };

    const handleSubmit = () => {
        console.log('esta es la opcion numero')
    };

    function timepoSeleccionado() {
        const horaIni = document.getElementById('horaInicio');
        const horaSal = document.getElementById('horaSalida');
        const contraseña = document.getElementById('contraseña');
        llamarApi('http://localhost:1234/actuTiempo', { idValor, horaIni: horaIni.value, horaSal: horaSal.value, contraseña: contraseña.value, opcion });
    }

    function eliminarHorario() {

        const contraseña = document.getElementById('contraseña');

        llamarApi('http://localhost:1234/quitarHorario', { idValor, contraseña: contraseña.value, opcion });
    }
    useEffect(() => { 
        console.log('aaaaaaaaaaaa')
        if(resultado.length>0){
            console.log('bbbbbbbbbbbbb')
            if(resultado[0].resultado==='actualizado'){
                console.log('ccccccccccccccc')
                const horaIni = document.getElementById('horaInicio');
                const horaSal = document.getElementById('horaSalida');
                cambiarHoraInicial(horaIni.value)
                cambiarHoraFinal(horaSal.value)
                
            }else{
                console.log('eliminado')
                cambiarHoraInicial(-1)
                cambiarHoraFinal(-1)
            }
            
        }
    },[resultado]);


    const contenidoComponente = () => {

        return (
            <div>
                <div class="p-4 ">
                    <label class="font-sans mr-4" for="horaInicio">Elige una hora de inicio:</label>
                    <select class="mr-4" id="horaInicio" name="horaIni">
                        {horas.map(Element => (<option value={Element}>{Element}</option>))}
                    </select>
                    <label class="mr-4" for="horaSalida">Elige una hora maxima:</label>
                    <select class="mr-4" id="horaSalida" name="horaSal">
                        {horas.map(Element => (<option value={Element}>{Element}</option>))}
                    </select>
                </div>
                <input name='contenido' type="password" value={textInput} onChange={handleInputChange} class="description bg-gray-100 sec p-3 h-4 border border-gray-300 outline-none overflow-wrap-normal ml-2" spellcheck="false" id="contraseña" placeholder="Contraseña"></input>

                <div class="buttons flex mt-3">
                    <div onClick={()=>timepoSeleccionado()} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Aceptar</div>
                    <div onClick={()=>eliminarHorario()} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"> Quitar horario</div>
                </div>
            </div>
        )
    }

    return (


        <div>
            <span class="font-sans ml-4 mr-4">El horario de uso esta restringido entre las {horaInicial} y las {horaFinal} horas</span>
            <button onClick={() => setMostrar(true)}>Cambiar</button>
            {mostrar ? contenidoComponente() : null}
        </div>
    )
}