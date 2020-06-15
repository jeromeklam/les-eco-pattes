import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  CAUSE_LOAD_DESCENDANTS_BEGIN,
  CAUSE_LOAD_DESCENDANTS_SUCCESS,
  CAUSE_LOAD_DESCENDANTS_FAILURE,
  CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadDescendants(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_LOAD_DESCENDANTS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          or: {
            parent1_cau_id: {eq : args.id},
            parent2_cau_id: {eq : args.id},
          }
        }
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/cause' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_LOAD_DESCENDANTS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_LOAD_DESCENDANTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadDescendantsError() {
  return {
    type: CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_DESCENDANTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadDescendantsPending: true,
        loadDescendantsError: null,
      };

    case CAUSE_LOAD_DESCENDANTS_SUCCESS:
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
        loadDescendantsPending: false,
        loadDescendantsError: null,
        causes: list,
        causesModels: causes,
      };

    case CAUSE_LOAD_DESCENDANTS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadDescendantsPending: false,
        loadDescendantsError: action.data.error,
      };

    case CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadDescendantsError: null,
      };

    default:
      return state;
  }
}
