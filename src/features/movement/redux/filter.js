import { freeAssoApi } from '../../../common';
import { objectToQueryString } from 'freejsonapi';
import {
  MOVEMENT_FILTER_BEGIN,
  MOVEMENT_FILTER_SUCCESS,
  MOVEMENT_FILTER_FAILURE,
  MOVEMENT_FILTER_DISMISS_ERROR,
} from './constants';

export function filter(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: MOVEMENT_FILTER_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const params = {
        page: { number: getState().movement.page_number, size: getState().movement.page_size },
        filter: { 
          and: {
            move_tr_name: args
          }
        }
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/movement' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: MOVEMENT_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: MOVEMENT_FILTER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissFilterError() {
  return {
    type: MOVEMENT_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case MOVEMENT_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case MOVEMENT_FILTER_FAILURE:
      // The request is failed
      return {
        ...state,
        filterPending: false,
        filterError: action.data.error,
      };

    case MOVEMENT_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
