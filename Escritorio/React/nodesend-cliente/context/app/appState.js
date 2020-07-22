import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ERROR,
    SUBIR_EXITO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR

} from '../../types';

const appState=({children})=>{

    const initialState={
        mensaje_archivo: null
    }

    const [state,dispatch]=useReducer(appReducer,initialState)

    const mostrarAlerta=msg=>{
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:msg
        });

        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })
        },3000)
    }

    return(
        <appContext.Provider
        value={{
            mensaje_archivo:state.mensaje_archivo,
            mostrarAlerta
        }}
        >
            {children}
        </appContext.Provider>
    )
}

export default appState;