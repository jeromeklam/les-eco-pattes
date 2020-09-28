import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  SITE_CREATE_ONE_BEGIN,
  SITE_CREATE_ONE_SUCCESS,
  SITE_CREATE_ONE_FAILURE,
  SITE_CREATE_ONE_DISMISS_ERROR,
} from './constants';

export function createOne(args = {}) {
  return dispatch => {
    dispatch({
      type: SITE_CREATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/asso/site', args);
      doRequest.then(
        res => {
          dispatch({
            type: SITE_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: SITE_CREATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissCreateOneError() {
  return {
    type: SITE_CREATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case SITE_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case SITE_CREATE_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        createOnePending: false,
        createOneError: error,
      };

    case SITE_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
