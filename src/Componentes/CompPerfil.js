import React, { useState, useEffect } from 'react'
import { useIdContext } from '../Hooks/IDhooks'
import { Outlet, Link } from 'react-router-dom';
import { useSqlHook } from '../Hooks/SqlHook';
import { conseguirArchivo } from '../FireBase/confing';
import { CompVentana } from './CompVentana';
import { usePerfilContext } from '../Hooks/PerfilHook';

export const CompPerfil = (props) => {

  const { idValor } = useIdContext();

  const { propio } = props;


  const { perfilPersonal, cambiarValorPerfil } = usePerfilContext();

  const condicion = (idValor === perfilPersonal) ||(perfilPersonal===-1);


  const { resultado, error, llamarApi } = useSqlHook('POST');
  const [urlImagen, setUrlImagen] = useState(null);
  const [opciones, setOpciones] = useState(-1);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = (opc) => {
    setOpciones(opc);
    console.log(opc)
    setIsOpen(true);
  };



  const infoFoto = () => {
    conseguirArchivo(resultado[0].foto).then(url => {
      setUrlImagen(url);
    })
  }

  useEffect(() => {
    if (resultado.length > 0) {
      infoFoto();
    }
  }, [resultado]);

  useEffect(() => {
    if (condicion) {
      llamarApi('http://localhost:1234/informacionUsuario', { idValor });
    } else {
      llamarApi('http://localhost:1234/informacionUsuario', { idValor: perfilPersonal });
    }

  }, []);

  return (//{resultado[0] && resultado[0].descripcion ? <p>{resultado[0].descripcion}</p> : <p>no tiene descripción</p>}
    <div>
      <div class="md:grid grid-cols-4 grid-rows-1bg-white gap-2 p-4 rounded-xl">
        {condicion && <div class="md:col-span-1 h-48 shadow-xl">
          <div class="flex w-full h-full relative" onClick={() => openModal(3)}>
            <img src={urlImagen} class="w-44 h-44 m-auto" alt=""></img>
          </div>
        </div>}
        {!condicion && <div class="md:col-span-1 h-48 shadow-xl">
          <div class="flex w-full h-full relative" >
            <img src={urlImagen} class="w-44 h-44 m-auto" alt=""></img>
          </div>
        </div>}

        <div class="md:grid grid-cols-6 col-span-3 h-48 shadow-xl p-4 p-3">
          <div class="col-span-2 px-4 border-l-0 border-gray-300 rounded-md rounded-l-none ">
            {resultado[0] && resultado[0].nombre}
          </div>
          <div class="col-span-2 px-4 border-l-0 border-gray-300 rounded-md rounded-l-none ">
            {resultado[0] && resultado[0].correo}
          </div>
          {condicion && <div class="col-span-6 px-4 border-l-0 border-gray-300 rounded-md rounded-l-none 1" onClick={() => openModal(4)}>
            {resultado[0] && resultado[0].descripcion}
          </div>}
          {!condicion && <div class="col-span-6 px-4 border-l-0 border-gray-300 rounded-md rounded-l-none 1">
            {resultado[0] && resultado[0].descripcion}
          </div>}
        </div>
        <div class="col-span-full  p-4 ">
          <div class="flex p-2 w-full justify-center">
            <Link to='posts'><button class="min-w-auto w-32 h-10  p-2 rounded-l-xl hover:bg-white-500  text-gray-600 font-semibold">
              Posts
            </button></Link>
            <Link to='comentarios'> <button class="min-w-auto w-32 h-10  p-2 rounded-none   text-gray-600 font-semibold">
              Comentarios
            </button></Link>
            <Link to='likes'><button class="min-w-auto w-32 h-10  p-2 rounded-none  text-gray-600 font-semibold">
              Likes
            </button></Link>
            {condicion &&
              <Link to='amigos'> <button class="min-w-auto w-32 h-10  p-2 rounded-none   text-gray-600 font-semibold">
                Amigos
              </button></Link>
            }
            {condicion && <Link to='opciones'> <button class="min-w-auto w-32 h-10  p-2 rounded-r-xl   text-gray-600 font-semibold">
              Opciones
            </button></Link>}
          </div>

        </div>


      </div>
      <Outlet></Outlet>
      {isOpen && <CompVentana setIsOpen={setIsOpen} opciones={opciones} />}
    </div>



  )
}/*CODIGO VIEJO SIN CSS


<div>

        <img src={urlImagen} width='100' height='100' ></img>

        {resultado[0] && resultado[0].descripcion}

        <button onClick={() => openModal(4)}>Editar descripcion</button>

        <button onClick={() => openModal(3)}>Editar foto</button>

        {isOpen && <CompVentana setIsOpen={setIsOpen} opciones={opciones} />}

        <div class="container">
          <div class="column">
            <Link to='posts'><button>Posts</button></Link>
          </div>
          <div class="column">
            <Link to='comentarios'><button>comentarios</button></Link>
          </div>
          <div class="column">
            <Link to='likes'><button>likes</button></Link>
          </div>
          <div class="column">
            <Link to='amigos'><button>amigos</button></Link>
          </div>
        </div>
        <Outlet></Outlet>
      </div>

<div class="container">
            <div class="column">
              <Link to='posts'><button>Posts</button></Link>
            </div>
            <div class="column">
              <Link to='comentarios'><button>comentarios</button></Link>
            </div>
            <div class="column">
              <Link to='likes'><button>likes</button></Link>
            </div>
            <div class="column">
              <Link to='amigos'><button>amigos</button></Link>
            </div>
          </div>
*/