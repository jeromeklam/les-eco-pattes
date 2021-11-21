import { jsonApiNormalizer, getJsonApi, normalizedObjectModeler, normalizedObjectUpdate } from 'jsonapi-front';
import {
  MOVEMENT_UPDATE_ONE_BEGIN,
  MOVEMENT_UPDATE_ONE_SUCCESS,
  MOVEMENT_UPDATE_ONE_FAILURE,
  MOVEMENT_UPDATE_ONE_DISMISS_ERROR,
  MOVEMENT_UPDATE_ONE_UPDATE,
} from './constants';
import { freeAssoApi, propagateModel } from '../../../common';

export function updateOne(id, obj = {}, propagate = true) {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const japiObj = getJsonApi(obj, 'FreeAsso_Movement');
      const doRequest = freeAssoApi.put('/v1/asso/movement/' + id, japiObj);
      doRequest.then(
        result => {
          const object = jsonApiNormalizer(result.data);
          const item   = normalizedObjectModeler(object, 'FreeAsso_Movement', id, { eager: true } );
          if (propagate) {
            dispatch(propagateModel('FreeAsso_Movement', result));
          }
          dispatch({
            type: MOVEMENT_UPDATE_ONE_SUCCESS,
            data: result,
            item: item,
          });
          resolve(item);
        },
        (err) => {
          dispatch({
            type: MOVEMENT_UPDATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateOneError() {
  return {
    type: MOVEMENT_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case MOVEMENT_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case MOVEMENT_UPDATE_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateOnePending: false,
        updateOneError: error,
      };

    case MOVEMENT_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case MOVEMENT_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_Movement', object, action.ignoreAdd || false);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
