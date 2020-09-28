import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_MAIN_TYPE_DEL_ONE_BEGIN,
  CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS,
  CAUSE_MAIN_TYPE_DEL_ONE_FAILURE,
  CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR,
} from './constants';

export function delOne(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: CAUSE_MAIN_TYPE_DEL_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const id = args;
      const doRequest = freeAssoApi.delete('/v1/asso/cause_main_type/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_MAIN_TYPE_DEL_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDelOneError() {
  return {
    type: CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MAIN_TYPE_DEL_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delOnePending: true,
        delOneError: null,
      };

    case CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        delOnePending: false,
        delOneError: null,
      };

    case CAUSE_MAIN_TYPE_DEL_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        delOnePending: false,
        delOneError: error,
      };

    case CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delOneError: null,
      };

    default:
      return state;
  }
}
