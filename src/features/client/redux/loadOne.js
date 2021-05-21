import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CLIENT_LOAD_ONE_BEGIN,
  CLIENT_LOAD_ONE_SUCCESS,
  CLIENT_LOAD_ONE_FAILURE,
  CLIENT_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return dispatch => {
    dispatch({
      type: CLIENT_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/client/' + args, {});
      doRequest.then(
        res => {
          dispatch({
            type: CLIENT_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: CLIENT_LOAD_ONE_FAILURE,
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
    type: CLIENT_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
        delOneError: null,
      };

    case CLIENT_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = normalizedObjectModeler(object, 'FreeAsso_Client', action.id, { eager: true });
      return {
        ...state,
        loadOnePending: false,
        loadOneError: null,
        loadOneItem: item,
      };

    case CLIENT_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case CLIENT_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
