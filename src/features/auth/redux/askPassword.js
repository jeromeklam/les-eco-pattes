import { jsonApiNormalizer } from 'jsonapi-front';
import {
  AUTH_ASK_PASSWORD_BEGIN,
  AUTH_ASK_PASSWORD_SUCCESS,
  AUTH_ASK_PASSWORD_FAILURE,
  AUTH_ASK_PASSWORD_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function askPassword(args = {}) {
  return dispatch => {
    dispatch({
      type: AUTH_ASK_PASSWORD_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/sso/ask-password', args);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_ASK_PASSWORD_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_ASK_PASSWORD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissAskPasswordError() {
  return {
    type: AUTH_ASK_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_ASK_PASSWORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        askPasswordPending: true,
        askPasswordError: null,
      };

    case AUTH_ASK_PASSWORD_SUCCESS:
      // The request is success
      return {
        ...state,
        askPasswordPending: false,
        askPasswordError: null,
      };

    case AUTH_ASK_PASSWORD_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        askPasswordPending: false,
        askPasswordError: error,
      };

    case AUTH_ASK_PASSWORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        askPasswordError: null,
      };

    default:
      return state;
  }
}
