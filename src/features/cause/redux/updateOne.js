import { jsonApiNormalizer, getJsonApi, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi, propagateModel } from '../../../common';
import {
  CAUSE_UPDATE_ONE_BEGIN,
  CAUSE_UPDATE_ONE_SUCCESS,
  CAUSE_UPDATE_ONE_FAILURE,
  CAUSE_UPDATE_ONE_DISMISS_ERROR,
} from './constants';

export function updateOne(id, obj = {}, propagate = true) {
  return dispatch => {
    dispatch({
      type: CAUSE_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const japiObj = getJsonApi(obj, 'FreeAsso_Cause');
      const doRequest = freeAssoApi.put('/v1/asso/cause/' + id, japiObj);
      doRequest.then(
        result => {
          const object = jsonApiNormalizer(result.data);
          const item   = normalizedObjectModeler(object, 'FreeAsso_Cause', id, { eager: true } );
          if (propagate) {
            dispatch(propagateModel('FreeAsso_Cause', result));
          }
          dispatch({
            type: CAUSE_UPDATE_ONE_SUCCESS,
            data: result,
            item: item,
          });
          resolve(item);
        },
        err => {
          dispatch({
            type: CAUSE_UPDATE_ONE_FAILURE,
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
    type: CAUSE_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case CAUSE_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case CAUSE_UPDATE_ONE_FAILURE:
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

    case CAUSE_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    default:
      return state;
  }
}
