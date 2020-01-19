import { freeAssoApi, objectToQueryString } from '../../../common';
import {
  CLIENT_TYPE_FILTER_BEGIN,
  CLIENT_TYPE_FILTER_SUCCESS,
  CLIENT_TYPE_FILTER_FAILURE,
  CLIENT_TYPE_FILTER_DISMISS_ERROR,
} from './constants';

export function filter(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: CLIENT_TYPE_FILTER_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const params = {
        page: { number: getState().clit.page_number, size: getState().clit.page_size },
        filter: { 
          and: {
            clit_name: args
          }
        }
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/client_type' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENT_TYPE_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CLIENT_TYPE_FILTER_FAILURE,
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
    type: CLIENT_TYPE_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_TYPE_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case CLIENT_TYPE_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case CLIENT_TYPE_FILTER_FAILURE:
      // The request is failed
      return {
        ...state,
        filterPending: false,
        filterError: action.data.error,
      };

    case CLIENT_TYPE_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
