import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectModeler, objectToQueryString } from 'jsonapi-front';
import {
  INBOX_LOAD_MORE_BEGIN,
  INBOX_LOAD_MORE_SUCCESS,
  INBOX_LOAD_MORE_FAILURE,
  INBOX_LOAD_MORE_DISMISS_ERROR,
} from './constants';

export function loadMore(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: INBOX_LOAD_MORE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const params = {
        fields: '-inbox_params,-inbox_content'
      }
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/core/inbox'+ addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: INBOX_LOAD_MORE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: INBOX_LOAD_MORE_FAILURE,
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
    type: INBOX_LOAD_MORE_DISMISS_ERROR,
  };
}

export function useLoadMore(params) {
  const dispatch = useDispatch();

  const { loadMorePending, loadMoreError } = useSelector(
    state => ({
      loadMorePending: state.inbox.loadMorePending,
      loadMoreError: state.inbox.loadMoreError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadMore(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

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
    case INBOX_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        page_number: 1,
      };

    case INBOX_LOAD_MORE_SUCCESS:
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
      const inboxes = normalizedObjectModeler(list, 'FreeFW_Inbox');
      let not_downloaded = 0
      inboxes && inboxes.forEach(elem => {
        if (!elem.inbox_download_ts) {
          not_downloaded++;
        }
      });
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        items: list,
        models: inboxes,
        count: nbre,
        not_downloaded: not_downloaded,
      };

    case INBOX_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case INBOX_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
