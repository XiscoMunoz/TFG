import React,{ useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'

export const CompInicial = () => {

  useEffect(() => {
    localStorage.clear();
}, []);

  return (

    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="inicioSesion"><button className="botones-inicial"> Iniciar sesion</button></Link>
        <Link to="nuevoUsuario"><button className="botones-inicial"> Nuevo Usuario </button></Link>
        <Outlet></Outlet>
      </div>
      
    </div>

  )
}