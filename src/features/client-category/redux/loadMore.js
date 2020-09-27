import { jsonApiNormalizer, objectToQueryString, getNewNormalizedObject } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  CLIENT_CATEGORY_LOAD_MORE_INIT,
  CLIENT_CATEGORY_LOAD_MORE_BEGIN,
  CLIENT_CATEGORY_LOAD_MORE_SUCCESS,
  CLIENT_CATEGORY_LOAD_MORE_FAILURE,
  CLIENT_CATEGORY_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    const loaded = getState().clientCategory.loadMoreFinish;
    const loading = getState().clientCategory.loadMorePending;
    if (!loading && (!loaded || reload)) {
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
        let sort = '';
        getState().clientCategory.sort.forEach(elt => {
          let add = elt.col;
          if (elt.way === 'down') {
            add = '-' + add;
          }
          if (sort === '') {
            sort = add;
          } else {
            sort = sort + ',' + add;
          }
        });
        if (sort !== '') {
          params.sort = sort;
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
        items: getNewNormalizedObject('FreeAsso_ClientCategory'),
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
        loadMoreFinish: nbre < state.page_size,
        items: list,
        page_number: state.page_number + 1,
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
