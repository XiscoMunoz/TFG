import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useIdContext } from '../Hooks/IDhooks'
import { io } from 'socket.io-client';
import { useSqlHook } from '../Hooks/SqlHook';
import { CompMen } from './CompMen';
import { subirArchivo } from '../FireBase/confing';

export const CompConversacion = () => {

  const { name } = useParams()
  const { idValor } = useIdContext();



  const socket = io('http://localhost:1234')

  const [mensaje, setMensaje] = useState('');
  const [archivo, setArchivo] = useState(null);


  const { resultado, error, llamarApi } = useSqlHook('POST');

  const contenedorMensajesRef = useRef(null);

  const enviarMensaje = () => {
    if (archivo) {
      const nombre = "chat_usuario_" + idValor + "_" + archivo.name;
      console.log('1')
      console.log(nombre)
      subirArchivo(archivo, nombre);
      socket.emit('mensaje chat', { name, mensaje:nombre, idValor, tipo: 'imagen' })
    } else {
      if (mensaje.trim() !== '') {
        socket.emit('mensaje chat', { name, mensaje, idValor, tipo: 'texto' })
      }
    }

    setMensaje('');
    setArchivo(null);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      enviarMensaje();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setArchivo(file); // Guardar el archivo en el estado
  };

  useEffect(() => {
    const container = document.getElementById('contenedor-mensajes');
    container.scrollTop = container.scrollHeight;
  }, [resultado]);


  useEffect(() => {
    llamarApi('http://localhost:1234/conversacion', { idValor, name });
    socket.emit('join chat', { name })
    socket.on('mensaje chat', (data) => llamarApi('http://localhost:1234/conversacion', { idValor, name }))
    return () => {
      socket.off('connect')
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div></div>
        <Link to='/mensajes/listado' className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full ml-3 text-sm hover:bg-blue-600">Atras</Link>
      </div>
      <div class="grid grid-cols-1 gap-4">

        <div id="contenedor-mensajes" class="flex flex-col space-y-4 h-[650px] overflow-y-auto scrollbar-hidden">
          {resultado.map(res => (
            <CompMen contenido={res.contenido} id={res.id_usuario_recibe} tipo={res.tipo}></CompMen>
          ))}

        </div>

        <div >
          <input type="text" placeholder="Escriba su mensaje" value={mensaje} onChange={e => setMensaje(e.target.value)} class="flex-1 py-2 px-3 rounded-full bg-gray-100  rounded px-3 text-sm w-[865px]" onKeyPress={handleKeyPress} ></input>
          <button onClick={() => enviarMensaje()} class="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">Enviar</button>
          <input type="file" name='imagen' onChange={handleFileChange}></input>
        </div>
      </div>
    </>
  )
}