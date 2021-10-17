import { jsonApiNormalizer, objectToQueryString, getNewNormalizedObject } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  EMAIL_LOAD_MORE_INIT,
  EMAIL_LOAD_MORE_BEGIN,
  EMAIL_LOAD_MORE_SUCCESS,
  EMAIL_LOAD_MORE_FAILURE,
  EMAIL_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(reload = false) {
  return (dispatch, getState) => {
    const loaded =  getState().email.loadMoreFinish;
    const loading =  getState().email.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: EMAIL_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: EMAIL_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        const params = {
          page: { number: getState().email.page_number, size: getState().email.page_size },
        };
        const addUrl = objectToQueryString(params);
        const doRequest = freeAssoApi.get('/v1/core/email' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: EMAIL_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: EMAIL_LOAD_MORE_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
      });
      return promise;
    }
  };
}

export function dismissLoadMoreError() {
  return {
    type: EMAIL_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: getNewNormalizedObject('FreeFW_Email'),
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
        filters: [],
      };

    case EMAIL_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case EMAIL_LOAD_MORE_SUCCESS:
      // The request is success
      let list = {};
      let nbre = 0;
      let result = false;
      if (action.data && action.data.data) {
        result = action.data.data;
      }
      if (result.data) {
        nbre = result.data.length;
      }
      if (nbre > 0) {
        if (state.items) {
          list = jsonApiNormalizer(result, state.items);
        } else {
          list = jsonApiNormalizer(result);
        }
      } else {
        list = state.items;
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        loadMoreFinish: (nbre < state.page_size),
        items: list,
        page_number: state.page_number+1
      };

    case EMAIL_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case EMAIL_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
