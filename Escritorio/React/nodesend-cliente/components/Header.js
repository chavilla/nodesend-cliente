import React, { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/autenticacion/authContext";
import AppContext from '../context/app/appContext';
import { useRouter } from 'next/router';
import { CERRAR_SESION } from "../types";

const Header = () => {
  const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);
  const { limpiarState }=useContext(AppContext);

  //routing
  const router=useRouter();

  useEffect(()=>{
    usuarioAutenticado();
  },[]);

  const redireccionar=()=>{
    router.push('/');
    limpiarState();
  }


  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        <img
        onClick={()=> redireccionar()} 
        src="/logo.svg" 
        className="w-64 mb-8 md:mb-0 cursor-pointer"/>
      <div>
        {usuario ? (
            <div
            className='flex items-center'
            >
            <p className='mr-5'>Hola {usuario.name}</p> 
            <button 
            className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
            type='button' onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
            </div>
        ) : (
            <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 mr-2 rounded-lg text-white font-bold uppercase">
                Iniciar Sesión
              </a>
            </Link>
            <Link href="/registro">
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                Registrarse
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
