import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNewNormalizedObject, jsonApiNormalizer, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  HISTORY_LOAD_MORE_INIT,
  HISTORY_LOAD_MORE_BEGIN,
  HISTORY_LOAD_MORE_SUCCESS,
  HISTORY_LOAD_MORE_FAILURE,
  HISTORY_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(reload = false) {
  return (dispatch, getState) => { 
    const loaded =  getState().history.loadMoreFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: HISTORY_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: HISTORY_LOAD_MORE_BEGIN,
        });
      }

      const promise = new Promise((resolve, reject) => {
        let filters = getState().history.filters.asJsonApiObject()
        let params = {
          page: { number: getState().history.page_number, size: getState().history.page_size }, 
          ...filters,
          include: 'user',
        };
        let sort = '';
        getState().history.sort.forEach(elt => {
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
        const doRequest = freeAssoApi.get('/v1/core/history' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: HISTORY_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: HISTORY_LOAD_MORE_FAILURE,
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
    type: HISTORY_LOAD_MORE_DISMISS_ERROR,
  };
}

export function useLoadMore() {
  const dispatch = useDispatch();

  const { loadMorePending, loadMoreError } = useSelector(
    state => ({
      loadMorePending: state.history.loadMorePending,
      loadMoreError: state.history.loadMoreError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadMore(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadMoreError());
  }, [dispatch]);

  return {
    loadMore: boundAction,
    loadMorePending,
    loadMoreError,
    dismissLoadMoreError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HISTORY_LOAD_MORE_INIT:
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        items: getNewNormalizedObject('FreeFW_History'),
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };
    
    case HISTORY_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case HISTORY_LOAD_MORE_SUCCESS:
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
        items: list,
        page_number: state.page_number+1
      };

    case HISTORY_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case HISTORY_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
