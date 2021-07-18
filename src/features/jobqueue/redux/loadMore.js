import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, getNewNormalizedObject } from 'jsonapi-front';
import {
  JOBQUEUE_LOAD_MORE_INIT,
  JOBQUEUE_LOAD_MORE_BEGIN,
  JOBQUEUE_LOAD_MORE_SUCCESS,
  JOBQUEUE_LOAD_MORE_FAILURE,
  JOBQUEUE_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded = getState().jobqueue.loadMoreFinish;
    const loading = getState().jobqueue.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: JOBQUEUE_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: JOBQUEUE_LOAD_MORE_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let filters = getState().jobqueue.filters.asJsonApiObject();
        let params = {
          page: { number: getState().jobqueue.page_number, size: getState().jobqueue.page_size },
          ...filters,
        };
        let sort = '';
        getState().jobqueue.sort.forEach(elt => {
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
        const doRequest = freeAssoApi.get('/v1/core/jobqueue' + addUrl, {});
        doRequest.then(
          res => {
            dispatch({
              type: JOBQUEUE_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: JOBQUEUE_LOAD_MORE_FAILURE,
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
    type: JOBQUEUE_LOAD_MORE_DISMISS_ERROR,
  };
}

export function useLoadMore() {
  const dispatch = useDispatch();

  const { loadMorePending, loadMoreError } = useSelector(
    state => ({
      loadMorePending: state.jobqueue.loadMorePending,
      loadMoreError: state.jobqueue.loadMoreError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(loadMore(...args));
    },
    [dispatch],
  );

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
    case JOBQUEUE_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        page_number: 1,
        page_size: 999,
      };

    case JOBQUEUE_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case JOBQUEUE_LOAD_MORE_SUCCESS:
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
        if (state.page_number > 1) {
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

    case JOBQUEUE_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case JOBQUEUE_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
