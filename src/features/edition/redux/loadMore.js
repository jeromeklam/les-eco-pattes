import {
  normalizedObjectModeler,
  jsonApiNormalizer,
  getNewNormalizedObject,
} from 'jsonapi-front';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_LOAD_MORE_BEGIN,
  EDITION_LOAD_MORE_SUCCESS,
  EDITION_LOAD_MORE_FAILURE,
  EDITION_LOAD_MORE_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadMore(reload = true) {
  return dispatch => {
    dispatch({
      type: EDITION_LOAD_MORE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/edition?fields=-edi_data', {});
      doRequest.then(
        res => {
          dispatch({
            type: EDITION_LOAD_MORE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: EDITION_LOAD_MORE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadMoreError() {
  return {
    type: EDITION_LOAD_MORE_DISMISS_ERROR,
  };
}

export function useLoadMore() {
  const dispatch = useDispatch();

  const { loadMorePending, loadMoreError } = useSelector(
    state => ({
      loadMorePending: state.edition.loadMorePending,
      loadMoreError: state.edition.loadMoreError,
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
    case EDITION_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        items: getNewNormalizedObject('FreeFW_Edition'),
        page_number: 1,
        page_size: 999999,
        models: [],
      };

    case EDITION_LOAD_MORE_SUCCESS:
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
      const models = normalizedObjectModeler(list, 'FreeFW_Edition', null, { eager: true });
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        items: list,
        models: models,
        loadMoreFinish: nbre < state.page_size,
        page_number: state.page_number + 1,
      };

    case EDITION_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case EDITION_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
