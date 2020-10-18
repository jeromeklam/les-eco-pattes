import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  AUTH_UPDATE_ONE_BEGIN,
  AUTH_UPDATE_ONE_SUCCESS,
  AUTH_UPDATE_ONE_FAILURE,
  AUTH_UPDATE_ONE_DISMISS_ERROR,
} from './constants';

export function updateOne(id, args = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTH_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/sso/save', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_UPDATE_ONE_FAILURE,
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
    type: AUTH_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case AUTH_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case AUTH_UPDATE_ONE_FAILURE:
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

    case AUTH_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    default:
      return state;
  }
}
