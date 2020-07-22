import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ERROR,
    SUBIR_EXITO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR

} from '../../types';

export default(state,action)=>{
    switch(action.type){
        case MOSTRAR_ALERTA:
            return{
                ...state,
                mensaje_archivo:action.payload
            }
        case OCULTAR_ALERTA:
            return{
                ...state,
                mensaje_archivo:null
            }
        default:
            return{
                state
            }
    }
}