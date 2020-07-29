import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OCULTAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_CORRECTO,
    CERRAR_SESION
} from '../../types/';

export default(state,action)=>{
    switch(action.type){

        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        
        case LOGIN_CORRECTO:
            localStorage.setItem('token',action.payload);
            return{
                ...state,
                token: action.payload,
                autenticado:true
            }

        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario: action.payload,
                autenticado:true
            }
        
        case OCULTAR_ALERTA:
            return{
                ...state,
                mensaje: null
            }
        
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                usuario:null,
                token:null,
                autenticado:null,
                mensaje: null
            }
        default:
            return state
    }
}