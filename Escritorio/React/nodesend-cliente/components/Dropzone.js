import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from "../context/app/appContext";
import authContext from "../context/autenticacion/authContext";
import Formulario from './Formulario';

const Dropzone = () => {

  const {cargando,subirArchivos,mostrarAlerta,crearEnlace}=useContext(appContext);

  const { autenticado }=useContext(authContext);

  const onDropRejected=()=>{
    mostrarAlerta('El archivo es demasiado pesado. Para subir archivos mayores a 1MB regístrate.');
  }

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    subirArchivos(formData, acceptedFiles[0].path);
  }, []);

  //Extraer contenido de dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize:1000000 });

  //accerder archivo
  const archivos = acceptedFiles.map((archivo) => (
    <li
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
      key={archivo.lastModified}
    >
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div
      className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed
            border-gray-400 border-2 bg-gray-100 px-4"
    >
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{archivos}</ul>

          { autenticado ? 
          <Formulario/> : 
          null
          }

          { cargando 
          ? 
          <p className='my-10 text-center text-gray-600'>Subiendo archivo...</p>
          : <button
          className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
          type="button"
          onClick={() => crearEnlace()}
        >
          Crear Enlace
        </button>
          }
         
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()}></input>

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Soltar aquí</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona o arrastra un archivo
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Selecciona archivo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
