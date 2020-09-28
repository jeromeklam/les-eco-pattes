import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CLIENT_CATEGORY_CREATE_ONE_BEGIN,
  CLIENT_CATEGORY_CREATE_ONE_SUCCESS,
  CLIENT_CATEGORY_CREATE_ONE_FAILURE,
  CLIENT_CATEGORY_CREATE_ONE_DISMISS_ERROR,
} from './constants';

export function createOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CLIENT_CATEGORY_CREATE_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/asso/client_category', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENT_CATEGORY_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CLIENT_CATEGORY_CREATE_ONE_FAILURE,
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
    type: CLIENT_CATEGORY_CREATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_CATEGORY_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case CLIENT_CATEGORY_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case CLIENT_CATEGORY_CREATE_ONE_FAILURE:
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

    case CLIENT_CATEGORY_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
