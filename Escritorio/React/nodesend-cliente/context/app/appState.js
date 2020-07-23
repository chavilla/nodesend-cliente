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
  CREAR_ENLACE_ERROR,
} from "../../types";

const appState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombreArchivo: "",
    cargando: null,
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

  return (
    <appContext.Provider
      value={{
        nombre: state.nombre,
        nombreArchivo: state.nombreArchivo,
        mensaje_archivo: state.mensaje_archivo,
        cargando: state.cargando,
        mostrarAlerta,
        subirArchivos,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default appState;
