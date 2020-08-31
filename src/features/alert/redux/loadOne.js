import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  ALERT_LOAD_ONE_BEGIN,
  ALERT_LOAD_ONE_SUCCESS,
  ALERT_LOAD_ONE_FAILURE,
  ALERT_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: ALERT_LOAD_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/alert/' + args, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: ALERT_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ALERT_LOAD_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadOneError() {
  return {
    type: ALERT_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case ALERT_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      let emptyItem = state.emptyItem;
      item = normalizedObjectModeler(object, 'FreeFW_Alert', action.id, {eager: true});
      if (action.id <= 0) {
        emptyItem = {...item};
      }
      console.log("FK load one alert",item);
      return {
        ...state,
        loadOnePending: false,
        loadOneError: null,
        loadOneItem: item,
        emptyItem: emptyItem,
      };

    case ALERT_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case ALERT_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}