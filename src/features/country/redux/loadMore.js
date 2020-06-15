import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString } from 'freejsonapi';
import {
  COUNTRY_LOAD_MORE_INIT,
  COUNTRY_LOAD_MORE_BEGIN,
  COUNTRY_LOAD_MORE_SUCCESS,
  COUNTRY_LOAD_MORE_FAILURE,
  COUNTRY_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = true) {
  return (dispatch, getState) => {
    const loaded = getState().country.loadMoreFinish;
    const loading = getState().country.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: COUNTRY_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: COUNTRY_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let params = {
          page: {
            number: getState().country.page_number,
            size: getState().country.page_size,
          },
        };
        if (args && Object.keys(args).length > 0 && args !== '') {
          params.filter = {
            and: {
              clit_name: {eq: args},
            },
          };
        }
        const addUrl = objectToQueryString(params);
        const doRequest = freeAssoApi.get('/v1/core/country' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: COUNTRY_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: COUNTRY_LOAD_MORE_FAILURE,
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
    type: COUNTRY_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COUNTRY_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: [],
        page_number: 1,
        page_size: 0,
      };

    case COUNTRY_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case COUNTRY_LOAD_MORE_SUCCESS:
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

    case COUNTRY_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case COUNTRY_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
