import { useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OCULTAR_ALERTA
} from '../../types/';
import clienteAxios from '../../config/axios';

const authState=({children})=>{

    //state inicial
    const initialState={
        autenticado:null,
        usuario:null,
        token:null,
        mensaje:null
    }

    //hooks de use reducer
    const [state,dispatch]=useReducer(authReducer,initialState);

    //Registra un nuevo usuario
    const registrarUsuario=async (data)=>{
        try {
            const respuesta=await clienteAxios.post('/api/users', data);
                dispatch({
                    type: REGISTRO_EXITOSO,
                    payload: respuesta.data.msg
                })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        //Limpia el alert
        setTimeout(()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        },3000)
    }

    //Funcion para obtener un usuario autenticado
    const usuarioAutenticado=nombre=>{
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload:nombre
        })
    }    

    return(
        <AuthContext.Provider
        value={{
            autenticado:state.autenticado,
            usuario:state.usuario,
            token:state.token,
            mensaje:state.mensaje,
            registrarUsuario,
            usuarioAutenticado
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default authState;