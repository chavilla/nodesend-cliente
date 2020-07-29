import React, {useContext, useEffect} from 'react';
import Dropzone from '../components/Dropzone';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import authContext from '../context/autenticacion/authContext';
import Link from 'next/link';
import appContext from "../context/app/appContext";
import { MOSTRAR_ALERTA } from '../types';

const Home = () => {

  const { usuarioAutenticado }=useContext(authContext);
  const {mensaje_archivo, url}=useContext(appContext);


  useEffect(()=>{
    const token=localStorage.getItem('token');
    if (token) {
      usuarioAutenticado(); 
    }
  },[])

  return ( 
    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          {url ? (
            <>
            <p className='text-center text-2xl'><span className='font-bold text-red-700'>Tu url es</span>{`${process.env.frontedURL}/enlaces/${url}`}</p>
            <button
            onClick={()=> navigator.clipboard.writeText(`${process.env.frontedURL}/enlaces/${url}`)} 
            type='button' className='bg-red-500 mt-4 hover:bg-gray-900 w-full p-2 text-white
            uppercase font-bold'>Copiar Enlace</button>
            </>
          ):(
            <>
            {mensaje_archivo && <Alerta/> }
              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                <Dropzone/>
                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                    Compartir archivos de forma rápida y segura
                  </h2>
                  <p className=""><span className="text-red-500 leading-lose">ReactNodeSend</span> Te permite compartir archivos con cifrados de extremo a extremo. Tu archivo es eliminado después de ser descargado. Asi que puedes mantener lo que compartes en privado y asegurarte que tus cosas no permanecen en línea para siempre.</p>
                  <Link href="/registro">
                    <a className="text-red-500">Crea una cuenta para mayores beneficios</a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
    </Layout>
   );
}
 
export default Home;