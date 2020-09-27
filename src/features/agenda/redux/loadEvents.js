import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString } from 'jsonapi-tools';
import {
  AGENDA_LOAD_EVENTS_BEGIN,
  AGENDA_LOAD_EVENTS_SUCCESS,
  AGENDA_LOAD_EVENTS_FAILURE,
  AGENDA_LOAD_EVENTS_DISMISS_ERROR,
} from './constants';

export function loadEvents(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: AGENDA_LOAD_EVENTS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const params = {filter : args};
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: AGENDA_LOAD_EVENTS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AGENDA_LOAD_EVENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadEventsError() {
  return {
    type: AGENDA_LOAD_EVENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AGENDA_LOAD_EVENTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadEventsPending: true,
        loadEventsError: null,
      };

    case AGENDA_LOAD_EVENTS_SUCCESS:
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
        loadEventsPending: false,
        loadEventsError: null,
        events: list,
      };

    case AGENDA_LOAD_EVENTS_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadEventsPending: false,
        loadEventsError: error,
      };

    case AGENDA_LOAD_EVENTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadEventsError: null,
      };

    default:
      return state;
  }
}
