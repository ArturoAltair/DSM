import { baseUrl } from '../comun/comun';
import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      var com = action.payload;
      var mensajeError = null;
      com.id = state.comentarios.length;
      //  return {...state, errMess: null, comentarios: state.comentarios.concat(com)};
      fetch(baseUrl + 'comentarios/' + com.id + '.json', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          com
        )
      })
        .then(response => response.json())
        .catch(error => { mensajeError = error.message });

      return { ...state, errMess: mensajeError, comentarios: state.comentarios.concat(com) };

    default:
      return state;
  }
};