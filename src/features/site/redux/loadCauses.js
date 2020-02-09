import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  SITE_LOAD_CAUSES_BEGIN,
  SITE_LOAD_CAUSES_SUCCESS,
  SITE_LOAD_CAUSES_FAILURE,
  SITE_LOAD_CAUSES_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadCauses(args = {}) {
  return (dispatch) => {
    dispatch({
      type: SITE_LOAD_CAUSES_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
        const filter = {
          filter: {
            site_id: args,
          }
        }
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/asso/cause' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_LOAD_CAUSES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_LOAD_CAUSES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadCausesError() {
  return {
    type: SITE_LOAD_CAUSES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_LOAD_CAUSES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadCausesPending: true,
        loadCausesError: null,
        causes: [],
        causesModels: [],
      };

    case SITE_LOAD_CAUSES_SUCCESS:
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
      const causes = buildModel(list, 'FreeAsso_Cause');
      return {
        ...state,
        loadCausesPending: false,
        loadCausesError: null,
        loadCausesFinish: true,
        causes: list,
        causesModels: causes,
      };

    case SITE_LOAD_CAUSES_FAILURE:
      // The request is failed
      return {
        ...state,
        loadCausesPending: false,
        loadCausesError: action.data.error,
      };

    case SITE_LOAD_CAUSES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadCausesError: null,
      };

    default:
      return state;
  }
}
