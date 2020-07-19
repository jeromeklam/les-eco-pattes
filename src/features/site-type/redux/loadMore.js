import { jsonApiNormalizer, objectToQueryString, getNewNormalizedObject } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  SITE_TYPE_LOAD_MORE_INIT,
  SITE_TYPE_LOAD_MORE_BEGIN,
  SITE_TYPE_LOAD_MORE_SUCCESS,
  SITE_TYPE_LOAD_MORE_FAILURE,
  SITE_TYPE_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().siteType.loadMoreFinish;
    const loading = getState().siteType.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: SITE_TYPE_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: SITE_TYPE_LOAD_MORE_BEGIN,
        });
      }

      const promise = new Promise((resolve, reject) => {
        let filters = getState().siteType.filters.asJsonApiObject();
        let params = {
          page: { number: getState().siteType.page_number, size: getState().siteType.page_size },
          ...filters,
        };
        let sort = '';
        getState().siteType.sort.forEach(elt => {
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
        const doRequest = freeAssoApi.get('/v1/asso/site_type' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: SITE_TYPE_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SITE_TYPE_LOAD_MORE_FAILURE,
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
    type: SITE_TYPE_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_TYPE_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: getNewNormalizedObject('FreeAsso_SiteType'),
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    case SITE_TYPE_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case SITE_TYPE_LOAD_MORE_SUCCESS:
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

    case SITE_TYPE_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case SITE_TYPE_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
