import { objectToQueryString } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_TYPE_FILTER_BEGIN,
  CAUSE_TYPE_FILTER_SUCCESS,
  CAUSE_TYPE_FILTER_FAILURE,
  CAUSE_TYPE_FILTER_DISMISS_ERROR,
} from './constants';

export function filter(args = {}) {
  return (dispatch, getState) => { 
    dispatch({
      type: CAUSE_TYPE_FILTER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const params = {
        page: { number: getState().causeType.page_number, size: getState().causeType.page_size },
        filter: { 
          and: {
            caut_name: args
          }
        }
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/cause_type' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_TYPE_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_TYPE_FILTER_FAILURE,
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
    type: CAUSE_TYPE_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_TYPE_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case CAUSE_TYPE_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case CAUSE_TYPE_FILTER_FAILURE:
      // The request is failed
      return {
        ...state,
        filterPending: false,
        filterError: action.data.error,
      };

    case CAUSE_TYPE_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
