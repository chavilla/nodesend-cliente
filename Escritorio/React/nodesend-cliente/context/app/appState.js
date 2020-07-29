import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";
import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ERROR,
  SUBIR_EXITO,
  SUBIENDO_ARCHIVO,
  CREAR_ENLACE_EXITO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD
} from "../../types";

const appState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombreArchivo: "",
    cargando: null,
    descargas:1,
    password:'',
    autor:'',
    url:''
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  //Funcion que sube archivos al servidor
  const subirArchivos = async (formData, path) => {
    dispatch({
      type: SUBIENDO_ARCHIVO,
    });

    try {
      const respuesta = await clienteAxios.post("api/files", formData);

      dispatch({
        type: SUBIR_EXITO,
        payload: {
          nombre: respuesta.data.file,
          nombre_original: path,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //Crea un enlace cda vez que se sube el archivo
  const crearEnlace =async () => {
    const data={
      name:state.nombre,
      originalName:state.nombreArchivo,
      download: state.descargas,
      password: state.password,
      author: state.autor
    }
    try {
      const respuesta=await clienteAxios.post('api/links',data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: respuesta.data.url
      })
    } catch (error) {
      console.log(error);
    }
  };

  //Limpiar el state
  const limpiarState=()=>{
    dispatch({
      type: LIMPIAR_STATE
    })
  }

  const agregarPassword=password=>{
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  }

  return (
    <appContext.Provider
      value={{
        nombre: state.nombre,
        nombreArchivo: state.nombreArchivo,
        mensaje_archivo: state.mensaje_archivo,
        cargando: state.cargando,
        descargas:state.descargas,
        password:state.password,
        autor:state.autor,
        url:state.url,
        mostrarAlerta,
        subirArchivos,
        crearEnlace,
        limpiarState,
        agregarPassword
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default appState;
