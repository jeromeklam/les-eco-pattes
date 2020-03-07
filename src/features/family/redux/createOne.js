import { freeAssoApi } from '../../../common';
import {
  FAMILY_CREATE_ONE_BEGIN,
  FAMILY_CREATE_ONE_SUCCESS,
  FAMILY_CREATE_ONE_FAILURE,
  FAMILY_CREATE_ONE_DISMISS_ERROR,
} from './constants';

export function createOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: FAMILY_CREATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/asso/family', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: FAMILY_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: FAMILY_CREATE_ONE_FAILURE,
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
    type: FAMILY_CREATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FAMILY_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case FAMILY_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case FAMILY_CREATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        createOnePending: false,
        createOneError: action.data.error,
      };

    case FAMILY_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
