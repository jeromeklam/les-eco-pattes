import { jsonApiNormalizer, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  ALERT_LOAD_PENDINGS_BEGIN,
  ALERT_LOAD_PENDINGS_SUCCESS,
  ALERT_LOAD_PENDINGS_FAILURE,
  ALERT_LOAD_PENDINGS_DISMISS_ERROR,
} from './constants';

export function loadPendings(mode, args = {}) {
  let deadline = new Date();
  let deadlineStart = new Date();
  let deadlineEnd = deadline;
  if (mode !== 'danger') {
    deadline.setDate(deadline.getDate() + 8);
    if (mode === 'warning') {
      deadlineStart = new Date();
      deadlineEnd = deadline;
    }
  }
  return dispatch => {
    dispatch({
      type: ALERT_LOAD_PENDINGS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      let filter = {
        alert_done_ts: { empty: '' },
        alert_deadline: { ltwen: deadline.toISOString() },
      };
      if (mode === 'warning') {
        filter.alert_deadline = { 
          between: [deadlineStart.toISOString() , deadlineEnd.toISOString() ] };
      }
      const params = {
        filter: filter,
        sort: 'alert_from',
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
      doRequest.then(
        res => {
          dispatch({
            type: ALERT_LOAD_PENDINGS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: ALERT_LOAD_PENDINGS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadPendingsError() {
  return {
    type: ALERT_LOAD_PENDINGS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_LOAD_PENDINGS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadPendingsPending: true,
        loadPendingsError: null,
      };

    case ALERT_LOAD_PENDINGS_SUCCESS:
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
        list = jsonApiNormalizer(result);
      } else {
        list = [];
      }
      return {
        ...state,
        loadPendingsPending: false,
        loadPendingsError: null,
        pendings: list,
      };

    case ALERT_LOAD_PENDINGS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadPendingsPending: false,
        loadPendingsError: action.data.error,
      };

    case ALERT_LOAD_PENDINGS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadPendingsError: null,
      };

    default:
      return state;
  }
}
