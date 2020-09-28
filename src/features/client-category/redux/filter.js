import { objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CLIENT_CATEGORY_FILTER_BEGIN,
  CLIENT_CATEGORY_FILTER_SUCCESS,
  CLIENT_CATEGORY_FILTER_FAILURE,
  CLIENT_CATEGORY_FILTER_DISMISS_ERROR,
} from './constants';

export function filter(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: CLIENT_CATEGORY_FILTER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const params = {
        page: { number: getState().clic.page_number, size: getState().clic.page_size },
        filter: { 
          and: {
            clic_name: args
          }
        }
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/client_category' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENT_CATEGORY_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CLIENT_CATEGORY_FILTER_FAILURE,
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
    type: CLIENT_CATEGORY_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_CATEGORY_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case CLIENT_CATEGORY_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case CLIENT_CATEGORY_FILTER_FAILURE:
      // The request is failed
      return {
        ...state,
        filterPending: false,
        filterError: action.data.error,
      };

    case CLIENT_CATEGORY_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
