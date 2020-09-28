import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_SICKNESS_LOAD_PENDINGS_BEGIN,
  CAUSE_SICKNESS_LOAD_PENDINGS_SUCCESS,
  CAUSE_SICKNESS_LOAD_PENDINGS_FAILURE,
  CAUSE_SICKNESS_LOAD_PENDINGS_DISMISS_ERROR,
} from './constants';

export function loadPendings(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_SICKNESS_LOAD_PENDINGS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/cause_sickness/pendings', {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_SICKNESS_LOAD_PENDINGS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_SICKNESS_LOAD_PENDINGS_FAILURE,
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
    type: CAUSE_SICKNESS_LOAD_PENDINGS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_SICKNESS_LOAD_PENDINGS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadPendingsPending: true,
        loadPendingsError: null,
      };

    case CAUSE_SICKNESS_LOAD_PENDINGS_SUCCESS:
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

    case CAUSE_SICKNESS_LOAD_PENDINGS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadPendingsPending: false,
        loadPendingsError: action.data.error,
      };

    case CAUSE_SICKNESS_LOAD_PENDINGS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadPendingsError: null,
      };

    default:
      return state;
  }
}
