import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jsonApiNormalizer, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  ALERT_LOAD_ALERTS_WARNING_BEGIN,
  ALERT_LOAD_ALERTS_WARNING_SUCCESS,
  ALERT_LOAD_ALERTS_WARNING_FAILURE,
  ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR,
} from './constants';

export function loadAlertsWarning(args = {}) {
  let deadline = new Date();
  let deadlineStart = new Date();
  let deadlineEnd = deadline;
  deadline.setDate(deadline.getDate() + 8);
  deadlineStart = new Date();
  deadlineEnd = deadline;
  return (dispatch) => {
    dispatch({
      type: ALERT_LOAD_ALERTS_WARNING_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      let filter = {
        alert_done_ts: { empty: '' },
        alert_deadline: { between: [deadlineStart.toISOString() , deadlineEnd.toISOString() ] },
      };
      const params = {
        filter: filter,
        sort: 'alert_from',
      };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: ALERT_LOAD_ALERTS_WARNING_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ALERT_LOAD_ALERTS_WARNING_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadAlertsWarningError() {
  return {
    type: ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR,
  };
}

export function useLoadAlertsWarning() {
  const dispatch = useDispatch();

  const { loadAlertsWarningPending, loadAlertsWarningError } = useSelector(
    state => ({
      loadAlertsWarningPending: state.alert.loadAlertsWarningPending,
      loadAlertsWarningError: state.alert.loadAlertsWarningError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadAlertsWarning(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadAlertsWarningError());
  }, [dispatch]);

  return {
    loadAlertsWarning: boundAction,
    loadAlertsWarningPending,
    loadAlertsWarningError,
    dismissLoadAlertsWarningError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_LOAD_ALERTS_WARNING_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadAlertsWarningPending: true,
        loadAlertsWarningError: null,
      };

    case ALERT_LOAD_ALERTS_WARNING_SUCCESS:
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
        loadAlertsWarningPending: false,
        loadAlertsWarningError: null,
        alertsWarning: list,
      };

    case ALERT_LOAD_ALERTS_WARNING_FAILURE:
      // The request is failed
      return {
        ...state,
        loadAlertsWarningPending: false,
        loadAlertsWarningError: action.data.error,
      };

    case ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadAlertsWarningError: null,
      };

    default:
      return state;
  }
}
