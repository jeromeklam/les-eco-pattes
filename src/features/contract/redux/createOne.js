import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CONTRACT_CREATE_ONE_BEGIN,
  CONTRACT_CREATE_ONE_SUCCESS,
  CONTRACT_CREATE_ONE_FAILURE,
  CONTRACT_CREATE_ONE_DISMISS_ERROR,
} from './constants';

export function createOne(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: CONTRACT_CREATE_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/asso/contract', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRACT_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CONTRACT_CREATE_ONE_FAILURE,
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
    type: CONTRACT_CREATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case CONTRACT_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case CONTRACT_CREATE_ONE_FAILURE:
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

    case CONTRACT_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
