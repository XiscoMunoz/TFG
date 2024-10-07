import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CompVentana } from './CompVentana';
import Temporizador from './CompTiempo';
import { useTiempoHook } from '../Hooks/TiempoHook';
import { useIdContext } from '../Hooks/IDhooks';
import { useNavigate } from 'react-router-dom';
import { usePerfilContext } from '../Hooks/PerfilHook';


export const CompHome = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAnadirAmigo, setIsOpenAnadirAmigo] = useState(false);
  const navigate = useNavigate();

  const {resetHoraFinal, resetHoraInicial, resetValorTiempo } = useTiempoHook();
  const {idValor,resetValor } = useIdContext();
  const { perfilPersonal, cambiarValorPerfil } = usePerfilContext();

  const resetearValores = () => {
    resetHoraFinal();
    resetHoraInicial();
    resetValorTiempo();
    resetValor();
  }
  
  const openModal = () => {
    setIsOpen(true);
  };

  const openModalAnadirAmigo = () => {
    setIsOpenAnadirAmigo(true);
  };

  return (
    <div class="grid grid-cols-4 gap-4 h-screen">


      <ul class="flex flex-col py-20 space-y-1 items-end " onClick={() => cambiarValorPerfil(-1)}>

        <li> <Link to="/home" class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6" >
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

          <span class="ml-2 text-sm tracking-wide truncate">Home</span>
        </Link>
        </li>
        <li> <Link to="/mensajes/listado" class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6" >
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span class="ml-2 text-sm tracking-wide truncate">Mensajes</span>
        </Link>
        </li>
        <li> <Link to="/perfil/posts" class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6" >
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

          <span class="ml-2 text-sm tracking-wide truncate">Perfil</span>
        </Link>
        </li>
        <li> <Link to="/solicitudes" class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6" >
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>

          <span class="ml-2 text-sm tracking-wide truncate">Solicitudes</span>
        </Link>
        </li>
        <li class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <span onClick={openModal} class="ml-2 text-sm tracking-wide truncate">Crear Post</span>
          {isOpen && <CompVentana setIsOpen={setIsOpen} opciones='0' />}

        </li>
        <li class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span onClick={openModalAnadirAmigo} class="ml-2 text-sm tracking-wide truncate">Añadir amigo</span>
          {isOpenAnadirAmigo && <CompVentana setIsOpen={setIsOpenAnadirAmigo} opciones='1' />}

        </li>
        <li> <Link to="/inicioSesion" class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6" >
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>

          <span onClick={() => resetearValores} class="ml-2 text-sm tracking-wide truncate">Cerrar Sesion</span>
        </Link>
        </li>

      </ul>

      <div class="col-span-2">
        <Outlet></Outlet>
      </div>
      <div class="">
        <Temporizador></Temporizador>
      </div>
    </div>


  );
};

/*codigo antiguo sin css <span onClick={openModalAnadirAmigo} class="relative flex flex-row items-center h-14  focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">Añadir amigo</span>

<div class="container">
        <div class="column">
          <h2>Las opciones disponibles</h2>
          <Link to="/home"><button >home</button></Link>
          <Link to="mensajes/listado"><button >Mensajes</button></Link>
          <Link to="solicitudes"><button>Solicitudes</button></Link>
          <Link to="perfil"><button>Perfil</button></Link>
        </div>
        <div class="column">
          <h2>Columna 2</h2>
          <Outlet></Outlet>
        </div>
        <div class="column">
          <h2>Contenido varible(no se que poenr exactamente)</h2>
          <button onClick={openModal}>Crear Post</button>
          {isOpen && <CompVentana setIsOpen={setIsOpen} opciones='0' />}
          <Link to="/login"><button >CERRAR SESION</button></Link>

        </div>
      </div>

MEDIO CSS


<div class=" flex flex-col gap-4">

          <Link to="/home" class="flex justify-center" ><button class="botones-home">home</button></Link>

          <Link to="mensajes/listado" class="flex justify-center"><button class="botones-home">Mensajes</button></Link>

          <Link to="solicitudes" class="flex justify-center"> <button class="botones-home">Solicitudes</button></Link>

          <Link to="perfil" class="flex justify-center"><button class="botones-home">Perfil</button></Link>

          <div class="flex justify-center" ><button onClick={openModal} class="botones-home">Crear Post</button></div>


          {isOpen && <CompVentana setIsOpen={setIsOpen} opciones='0' />}
          <Link to="/login" class="flex justify-center"> <button class="botones-home flex justify-center">CERRAR SESION</button></Link>

        </div>




        para los svgs

         <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
*/
