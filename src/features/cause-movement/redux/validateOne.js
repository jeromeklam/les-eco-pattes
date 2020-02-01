import { freeAssoApi } from '../../../common';
import {
  CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN,
  CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS,
  CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE,
  CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
} from './constants';

export function validateOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args;
      const doRequest = freeAssoApi.put('/v1/asso/cause_movement/validate/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissValidateOneError() {
  return {
    type: CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        validateOnePending: true,
        validateOneError: null,
      };

    case CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        validateOnePending: false,
        validateOneError: null,
      };

    case CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        validateOnePending: false,
        validateOneError: action.data.error,
      };

    case CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        validateOneError: null,
      };

    default:
      return state;
  }
}
