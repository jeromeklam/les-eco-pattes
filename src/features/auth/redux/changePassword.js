import { jsonApiNormalizer } from 'jsonapi-front';
import {
  AUTH_CHANGE_PASSWORD_BEGIN,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAILURE,
  AUTH_CHANGE_PASSWORD_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function changePassword(args = {}) {
  return dispatch => {
    dispatch({
      type: AUTH_CHANGE_PASSWORD_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/sso/change-password', args);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_CHANGE_PASSWORD_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_CHANGE_PASSWORD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissChangePasswordError() {
  return {
    type: AUTH_CHANGE_PASSWORD_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_CHANGE_PASSWORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        changePasswordPending: true,
        changePasswordError: null,
      };

    case AUTH_CHANGE_PASSWORD_SUCCESS:
      // The request is success
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: null,
      };

    case AUTH_CHANGE_PASSWORD_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: error,
      };

    case AUTH_CHANGE_PASSWORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        changePasswordError: null,
      };

    default:
      return state;
  }
}
