import { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_ERROR,
  LOGIN_CORRECTO,
  CERRAR_SESION,
} from "../../types/";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const authState = ({ children }) => {
  //state inicial
  const initialState = {
    autenticado: null,
    usuario: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    mensaje: null,
  };

  //hooks de use reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Registra un nuevo usuario
  const registrarUsuario = async (data) => {
    try {
      const respuesta = await clienteAxios.post("/api/users", data);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }

    //Limpia el alert
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  const iniciarSesion = async (data) => {
    try {
      const respuesta = await clienteAxios.post("api/auth", data);
      dispatch({
        type: LOGIN_CORRECTO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }

    //Limpia el alert
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  //Funcion para obtener un usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("api/auth");
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const cerrarSesion=()=>{
      dispatch({
          type: CERRAR_SESION
      })
  }

  return (
    <AuthContext.Provider
      value={{
        autenticado: state.autenticado,
        usuario: state.usuario,
        token: state.token,
        mensaje: state.mensaje,
        usuario: state.usuario,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default authState;
