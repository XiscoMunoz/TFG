import React, { useState } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';
import { usePostContext } from '../Hooks/PostHook';
import { subirArchivo } from '../FireBase/confing';

export function CompVentana({ setIsOpen, opciones, idPost }) {

    const closeModal = () => {
        setIsOpen(false);
    };
    const [textInput, setTextInput] = useState('');
    const [file, setFile] = useState(null);
    const [tipo, setTipo] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'contenido') {
            setTextInput(value);
            if (file) {
                
                setTipo('ambos');
            } else {
                setTipo('texto');
            }
        } else if (name === 'imagen') {
            setFile(event.target.files[0]);
            if (textInput) {
                
                setTipo('ambos');
            } else {
                setTipo('imagen');
            }
        }
    };

    const { resultado, error, llamarApi, llamarApiImagen } = useSqlHook('POST');

    const { idValor } = useIdContext();

    const {publicacion, cambiarValor}=usePostContext();



    const handleSubmit = () => {
        
        switch (opciones) {

            case '0':
                
            if (tipo === 'texto') {
                llamarApi('http://localhost:1234/home/post', { contenido: textInput, id: idValor, tipo });

            } else if (tipo === 'imagen') {
                const nombre = "usuario_" + idValor + "_" + file.name;
                console.log('1')
                console.log(nombre)
                subirArchivo(file, nombre);
                llamarApi('http://localhost:1234/home/post', { contenido: nombre, id: idValor, tipo });

            } else if (tipo === 'ambos') {
                const nombre = "usuario_" + idValor + "_" + file.name;
                console.log('2')
                console.log(nombre)
                subirArchivo(file, nombre);
                const contenido = textInput + '$' + nombre;
                llamarApi('http://localhost:1234/home/post', { contenido, id: idValor, tipo });
            }

                cambiarValor(true);

                break;
            case '1':
                llamarApi('http://localhost:1234/solicitudes/crear', { contenido: textInput, idValor });
                break;

            case '2':
                llamarApi('http://localhost:1234/comentario', { contenido: textInput, id: idValor, idPost: idPost });
                cambiarValor(true);
                console.log('cambiando el valor del hook comentarios')
                break;
            case 3:
                const nombre = "usuario_" + idValor + "_" + file.name
                subirArchivo(file, nombre)
                llamarApi('http://localhost:1234/editarPerfilFoto', { contenido: nombre, id: idValor });
                break;
            case 4:
                llamarApi('http://localhost:1234/editarPerfilDescripcion', { contenido: textInput, id: idValor });
                break;
        }

        closeModal();
    };

    const contenidoComponente = () => {
        switch (opciones) {
            case 4:
            case '2':

                return (<div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <div class=" editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
                        <input name='contenido' type="text" value={textInput} onChange={handleInputChange} class="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none overflow-wrap-normal" spellcheck="false" placeholder="Escriba aqui"></input>
                        <div class="buttons flex mt-3">
                            <div onClick={closeModal} class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancelar</div>
                            <div onClick={handleSubmit} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Aceptar</div>
                        </div>
                    </div>
                </div>)

            case '0': return (

                <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
                    <div class=" editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
                        <input name='contenido' type="text" value={textInput} onChange={handleInputChange} class="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none overflow-wrap-normal" spellcheck="false" placeholder="Escriba la publicacion"></input>
                        <div class="icons flex text-gray-500 m-2">
                            <label for="file-upload" class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </label>
                            <input id="file-upload" name='imagen' type="file" class="hidden" onChange={handleInputChange} />
                        </div>

                        <div class="buttons flex mt-3">
                            <div onClick={closeModal} class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancelar</div>
                            <div onClick={handleSubmit} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Aceptar</div>
                        </div>
                    </div>
                </div>


            )
            case 3:
                return (

                    <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                        <div class=" editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white ">
                            <input type="file" name='imagen' onChange={handleInputChange}></input>
                            <div class="buttons flex mt-3">
                                <div onClick={closeModal} class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancelar</div>
                                <div onClick={handleSubmit} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Aceptar</div>
                            </div>
                        </div>
                    </div>
                )
            case '1':
                return (
                    <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                        <div class=" editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
                            <input name='contenido' type="text" value={textInput} onChange={handleInputChange} class="description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none overflow-wrap-normal" spellcheck="false" placeholder="Escriba el correo"></input>
                            <div class="buttons flex mt-3">
                                <div onClick={closeModal} class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancelar</div>
                                <div onClick={handleSubmit} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Aceptar</div>
                            </div>
                        </div>
                    </div>)

        }
    }

    return (
        contenidoComponente());
}/**Codigo antiguo sin css

<div className="modal-container">
                    <div className="modal-content">
                        Contenido de la ventana flotante
                        <button className="close-button" onClick={closeModal}>X</button>
                    </div>
                    <input name='contenido' type="text" value={textInput} onChange={handleInputChange} placeholder="Escribe aquí" style={{ width: '300px', height: '80px' }} />
                    <button onClick={handleSubmit}>Enviar</button>
                    <input type="file" name='imagen' onChange={handleInputChange}></input>
                </div>

*/