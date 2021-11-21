import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import {
  MOVEMENT_LOAD_ONE_BEGIN,
  MOVEMENT_LOAD_ONE_SUCCESS,
  MOVEMENT_LOAD_ONE_FAILURE,
  MOVEMENT_LOAD_ONE_DISMISS_ERROR,
} from './constants';
import { getOneMovement } from '../';

export function loadOne(id = 0) {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = getOneMovement(id);
      doRequest.then(
        result => {
          const object = jsonApiNormalizer(result.data);
          const item   = normalizedObjectModeler(object, 'FreeAsso_Movement', id, { eager: true } );
          dispatch({
            type: MOVEMENT_LOAD_ONE_SUCCESS,
            data: result,
            item: item,
            id: id,
          });
          resolve(item);
        },
        (err) => {
          dispatch({
            type: MOVEMENT_LOAD_ONE_FAILURE,
            data: { error: err },
            id: id,
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadOneError() {
  return {
    type: MOVEMENT_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
        delOneError: null,
      };

    case MOVEMENT_LOAD_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: action.item,
        loadOneError: null,
      };

    case MOVEMENT_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case MOVEMENT_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
