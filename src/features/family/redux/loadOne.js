import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  FAMILY_LOAD_ONE_BEGIN,
  FAMILY_LOAD_ONE_SUCCESS,
  FAMILY_LOAD_ONE_FAILURE,
  FAMILY_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: FAMILY_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/family/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: FAMILY_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: FAMILY_LOAD_ONE_FAILURE,
            data: { error: err },
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
    type: FAMILY_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FAMILY_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        loadOneItem: null,
      };

    case FAMILY_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let raw = null;
      let object = jsonApiNormalizer(action.data.data);
      raw = normalizedObjectModeler(object, 'FreeAsso_Family', action.id);
      item = normalizedObjectModeler(object, 'FreeAsso_Family', action.id, {eager: true});
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneRaw: raw,      
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case FAMILY_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case FAMILY_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
