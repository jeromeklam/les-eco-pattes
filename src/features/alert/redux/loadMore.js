
import { jsonApiNormalizer, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  ALERT_LOAD_MORE_INIT,
  ALERT_LOAD_MORE_BEGIN,
  ALERT_LOAD_MORE_SUCCESS,
  ALERT_LOAD_MORE_FAILURE,
  ALERT_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = false, reload = false) {
  return (dispatch, getState) => {
    const loaded =  getState().alert.loadMoreFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: ALERT_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: ALERT_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let filters = getState().alert.filters.asJsonApiObject()
        let params = {
          page: { number: getState().alert.page_number, size: getState().alert.page_size },
          ...filters
        };
        let sort = '';
        getState().alert.sort.forEach(elt => {
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
        const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: ALERT_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: ALERT_LOAD_MORE_FAILURE,
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
    type: ALERT_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_LOAD_MORE_INIT:
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    case ALERT_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case ALERT_LOAD_MORE_SUCCESS:
      // The request is success
      let list = {};
      let nbre = 0;
      let result = false;
      let totalItems = state.totalItems;
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
        totalItems = list.TOTAL || false;
      } else {
        list = state.items;
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        items: list,
        totalItems,
        page_number: state.page_number+1
      };

    case ALERT_LOAD_MORE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: error,
      };

    case ALERT_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
