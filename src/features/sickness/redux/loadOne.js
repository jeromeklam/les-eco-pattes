import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  SICKNESS_LOAD_ONE_BEGIN,
  SICKNESS_LOAD_ONE_SUCCESS,
  SICKNESS_LOAD_ONE_FAILURE,
  SICKNESS_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: SICKNESS_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/sickness/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: SICKNESS_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SICKNESS_LOAD_ONE_FAILURE,
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
    type: SICKNESS_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SICKNESS_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        loadOneItem: null,
        loadOneRaw: null,
        createOneError: null,
        updateOneError: null,
      };

    case SICKNESS_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let raw = null;
      let object = jsonApiNormalizer(action.data.data);
      raw = normalizedObjectModeler(object, 'FreeAsso_Sickness', action.id);
      item = normalizedObjectModeler(object, 'FreeAsso_Sickness', action.id, {eager: true});
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneRaw: raw,      
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case SICKNESS_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case SICKNESS_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
