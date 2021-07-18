import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jsonApiNormalizer, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  ALERT_LOAD_ALERTS_DANGER_BEGIN,
  ALERT_LOAD_ALERTS_DANGER_SUCCESS,
  ALERT_LOAD_ALERTS_DANGER_FAILURE,
  ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR,
} from './constants';

export function loadAlertsDanger(args = {}) {
  let deadline = new Date();
  return (dispatch) => {
    dispatch({
      type: ALERT_LOAD_ALERTS_DANGER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      let filter = {
        alert_done_ts: { empty: '' },
        alert_deadline: { ltwe: deadline.toISOString() },
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
            type: ALERT_LOAD_ALERTS_DANGER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ALERT_LOAD_ALERTS_DANGER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadAlertsDangerError() {
  return {
    type: ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR,
  };
}

export function useLoadAlertsDanger() {
  const dispatch = useDispatch();

  const { loadAlertsDangerPending, loadAlertsDangerError } = useSelector(
    state => ({
      loadAlertsDangerPending: state.alert.loadAlertsDangerPending,
      loadAlertsDangerError: state.alert.loadAlertsDangerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadAlertsDanger(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadAlertsDangerError());
  }, [dispatch]);

  return {
    loadAlertsDanger: boundAction,
    loadAlertsDangerPending,
    loadAlertsDangerError,
    dismissLoadAlertsDangerError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_LOAD_ALERTS_DANGER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadAlertsDangerPending: true,
        loadAlertsDangerError: null,
      };

    case ALERT_LOAD_ALERTS_DANGER_SUCCESS:
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
        loadAlertsDangerPending: false,
        loadAlertsDangerError: null,
        alertsDanger: list,
      };

    case ALERT_LOAD_ALERTS_DANGER_FAILURE:
      // The request is failed
      return {
        ...state,
        loadAlertsDangerPending: false,
        loadAlertsDangerError: action.data.error,
      };

    case ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadAlertsDangerError: null,
      };

    default:
      return state;
  }
}
