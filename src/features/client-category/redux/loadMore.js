import { freeAssoApi, jsonApiNormalizer, objectToQueryString } from '../../../common';
import {
  CLIENT_CATEGORY_LOAD_MORE_INIT,
  CLIENT_CATEGORY_LOAD_MORE_BEGIN,
  CLIENT_CATEGORY_LOAD_MORE_SUCCESS,
  CLIENT_CATEGORY_LOAD_MORE_FAILURE,
  CLIENT_CATEGORY_LOAD_MORE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    const loaded = getState().clientCategory.loadMoreFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: CLIENT_CATEGORY_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: CLIENT_CATEGORY_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let params = {
          page: {
            number: getState().clientCategory.page_number,
            size: getState().clientCategory.page_size,
          },
        };
        if (args && Object.keys(args).length > 0 && args !== '') {
          params.filter = {
            and: {
              clic_name: args,
            },
          };
        }
        const addUrl = objectToQueryString(params);
        const doRequest = freeAssoApi.get('/v1/asso/client_category' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: CLIENT_CATEGORY_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          err => {
            dispatch({
              type: CLIENT_CATEGORY_LOAD_MORE_FAILURE,
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

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadMoreError() {
  return {
    type: CLIENT_CATEGORY_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_CATEGORY_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    case CLIENT_CATEGORY_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case CLIENT_CATEGORY_LOAD_MORE_SUCCESS:
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

    case CLIENT_CATEGORY_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case CLIENT_CATEGORY_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
