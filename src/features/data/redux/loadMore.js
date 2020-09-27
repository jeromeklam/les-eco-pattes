import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler, getNewNormalizedObject } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  DATA_LOAD_MORE_INIT,
  DATA_LOAD_MORE_BEGIN,
  DATA_LOAD_MORE_SUCCESS,
  DATA_LOAD_MORE_FAILURE,
  DATA_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().data.loadMoreFinish;
    const loading = getState().data.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: DATA_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: DATA_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let params = {
          page: { 
            number: getState().data.page_number, 
            size: getState().data.page_size 
          },
        };
        let sort = '';
        getState().data.sort.forEach(elt => {
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
        const doRequest = freeAssoApi.get('/v1/asso/data' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: DATA_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: DATA_LOAD_MORE_FAILURE,
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
    type: DATA_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: getNewNormalizedObject('FreeAsso_Data'),
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    case DATA_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case DATA_LOAD_MORE_SUCCESS:
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
        models: normalizedObjectModeler(list, 'FreeAsso_Data'),
        page_number: state.page_number + 1,
      };

    case DATA_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error || null,
      };

    case DATA_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
