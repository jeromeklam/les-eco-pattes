import { jsonApiNormalizer } from 'jsonapi-front';
import {
  AUTH_UPDATE_CONFIG_BEGIN,
  AUTH_UPDATE_CONFIG_SUCCESS,
  AUTH_UPDATE_CONFIG_FAILURE,
  AUTH_UPDATE_CONFIG_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function updateConfig(args = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTH_UPDATE_CONFIG_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/sso/update-config', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_UPDATE_CONFIG_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_UPDATE_CONFIG_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissUpdateConfigError() {
  return {
    type: AUTH_UPDATE_CONFIG_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_UPDATE_CONFIG_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateConfigPending: true,
        updateConfigError: null,
      };

    case AUTH_UPDATE_CONFIG_SUCCESS:
      // The request is success
      return {
        ...state,
        updateConfigPending: false,
        updateConfigError: null,
      };

    case AUTH_UPDATE_CONFIG_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateConfigPending: false,
        updateConfigError: error,
      };

    case AUTH_UPDATE_CONFIG_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateConfigError: null,
      };

    default:
      return state;
  }
}
