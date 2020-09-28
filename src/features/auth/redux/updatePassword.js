import { jsonApiNormalizer } from 'jsonapi-front';
import {
  AUTH_UPDATE_PASSWORD_BEGIN,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PASSWORD_FAILURE,
  AUTH_UPDATE_PASSWORD_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function updatePassword(args = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTH_UPDATE_PASSWORD_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/sso/update-password', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_UPDATE_PASSWORD_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_UPDATE_PASSWORD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissUpdatePasswordError() {
  return {
    type: AUTH_UPDATE_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_UPDATE_PASSWORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updatePasswordPending: true,
        updatePasswordError: null,
      };

    case AUTH_UPDATE_PASSWORD_SUCCESS:
      // The request is success
      return {
        ...state,
        updatePasswordPending: false,
        updatePasswordError: null,
      };

    case AUTH_UPDATE_PASSWORD_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updatePasswordPending: false,
        updatePasswordError: error,
      };

    case AUTH_UPDATE_PASSWORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updatePasswordError: null,
      };

    default:
      return state;
  }
}
