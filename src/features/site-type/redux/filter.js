import { freeAssoApi, objectToQueryString } from '../../../common';
import {
  SITE_TYPE_FILTER_BEGIN,
  SITE_TYPE_FILTER_SUCCESS,
  SITE_TYPE_FILTER_FAILURE,
  SITE_TYPE_FILTER_DISMISS_ERROR,
} from './constants';

export function filter(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: SITE_TYPE_FILTER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const params = {
        page: { number: getState().siteType.page_number, size: getState().siteType.page_size },
        filter: {
          and: {
            sitt_name: args,
          },
        },
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/site_type' + addUrl, {});
      doRequest.then(
        res => {
          dispatch({
            type: SITE_TYPE_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: SITE_TYPE_FILTER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFilterError() {
  return {
    type: SITE_TYPE_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_TYPE_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case SITE_TYPE_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case SITE_TYPE_FILTER_FAILURE:
      // The request is failed
      return {
        ...state,
        filterPending: false,
        filterError: action.data.error,
      };

    case SITE_TYPE_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
