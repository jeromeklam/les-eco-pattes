import {
  DASHBOARD_LOAD_MORE_BEGIN,
  DASHBOARD_LOAD_MORE_SUCCESS,
  DASHBOARD_LOAD_MORE_FAILURE,
  DASHBOARD_LOAD_MORE_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadMore(args = {}) {
  return dispatch => {
    dispatch({
      type: DASHBOARD_LOAD_MORE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const doRequest = freeAssoApi.get(process.env.REACT_APP_BO_URL + '/v1/asso/dashboard/stats', {
        headers: headers,
      });
      doRequest.then(
        res => {
          dispatch({
            type: DASHBOARD_LOAD_MORE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: DASHBOARD_LOAD_MORE_FAILURE,
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
    type: DASHBOARD_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case DASHBOARD_LOAD_MORE_SUCCESS:
      // The request is success
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        stats: action.data.data,
      };

    case DASHBOARD_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case DASHBOARD_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
