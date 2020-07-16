import { useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

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

    return(
        <AuthContext.Provider
        value={{
            autenticado:state.autenticado,
            usuario:state.usuario,
            token:state.token,
            mensaje:state.mensaje
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default authState;