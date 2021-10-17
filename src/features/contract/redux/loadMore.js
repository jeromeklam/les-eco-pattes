import { jsonApiNormalizer, objectToQueryString, getNewNormalizedObject } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CONTRACT_LOAD_MORE_INIT,
  CONTRACT_LOAD_MORE_BEGIN,
  CONTRACT_LOAD_MORE_SUCCESS,
  CONTRACT_LOAD_MORE_FAILURE,
  CONTRACT_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(reload = false) {

  return (dispatch, getState) => {
    const loaded = getState().contract.loadMoreFinish;
    const loading = getState().contract.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: CONTRACT_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: CONTRACT_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let filters = getState().contract.filters.asJsonApiObject()
        let params = {
          page: { number: getState().contract.page_number, size: getState().contract.page_size },
          ...filters
        };
        let sort = '';
        getState().contract.sort.forEach(elt => {
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
        const doRequest = freeAssoApi.get('/v1/asso/contract' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: CONTRACT_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: CONTRACT_LOAD_MORE_FAILURE,
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
    type: CONTRACT_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: getNewNormalizedObject('FreeAsso_Contract'),
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };


    case CONTRACT_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case CONTRACT_LOAD_MORE_SUCCESS:
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
        totalItems = list.TOTAL || 0;
      } else {
        list = state.items;
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        loadMoreFinish: (nbre < state.page_size),
        items: list,
        totalItems,
        page_number: state.page_number + 1
      };

    case CONTRACT_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case CONTRACT_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
