import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ERROR,
  SUBIR_EXITO,
  SUBIENDO_ARCHIVO,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      }
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: null,
      }
    case SUBIR_EXITO:
      return{
        ...state,
        nombre:action.payload.nombre,
        nombreArchivo: action.payload.nombre_original,
        cargando:null
      }
    case SUBIR_ERROR:
      return{
        ...state,
        mensaje_archivo: action.payload,
        cargando:null
      }
    case SUBIENDO_ARCHIVO:
      return{
        ...state,
        cargando:true
      }
    case CREAR_ENLACE_EXITO:
      return{
        ...state,
        url:action.payload
      }
    default:
      return {
        state,
      }
  }
};
