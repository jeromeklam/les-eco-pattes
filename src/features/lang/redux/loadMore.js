import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  LANG_LOAD_MORE_BEGIN,
  LANG_LOAD_MORE_SUCCESS,
  LANG_LOAD_MORE_FAILURE,
  LANG_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(reload = true) {
  return (dispatch, getState) => {
    const loaded = getState().lang.LoadMoreFinish;
    const loading = getState().lang.LoadMorePending;
    if (!loading && (!loaded)) {
      dispatch({
        type: LANG_LOAD_MORE_BEGIN,
      });

      const promise = new Promise((resolve, reject) => {
        const doRequest = freeAssoApi.get('/v1/core/lang', {});
        doRequest.then(
          (res) => {
            dispatch({
              type: LANG_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: LANG_LOAD_MORE_FAILURE,
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
    type: LANG_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LANG_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case LANG_LOAD_MORE_SUCCESS:
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
        LoadMoreFinish: true,
        items: list,
      };

    case LANG_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case LANG_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
