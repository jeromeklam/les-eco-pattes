import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  USER_UPDATE_ONE_BEGIN,
  USER_UPDATE_ONE_SUCCESS,
  USER_UPDATE_ONE_FAILURE,
  USER_UPDATE_ONE_DISMISS_ERROR,
} from './constants';


export function updateOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: USER_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      const doRequest = freeAssoApi.put('/v1/sso/user/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: USER_UPDATE_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: USER_UPDATE_ONE_FAILURE,
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
    type: USER_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case USER_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case USER_UPDATE_ONE_FAILURE:
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

    case USER_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error      
      return {
        ...state,
        updateOneError: null,
      };

    default:
      return state;
  }
}
