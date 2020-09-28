import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'jsonapi-front';
import {
  CAUSE_GROWTH_LOAD_GROWTHS_BEGIN,
  CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS,
  CAUSE_GROWTH_LOAD_GROWTHS_FAILURE,
  CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadGrowths(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_GROWTH_LOAD_GROWTHS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          cau_id: {eq: args.id},
        },
        sort: '-grow_ts'
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/cause_growth' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS,
            data: res,
            cause: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_GROWTH_LOAD_GROWTHS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadGrowthsError() {
  return {
    type: CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_GROWTH_LOAD_GROWTHS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadGrowthsPending: true,
        loadGrowthsError: null,
        cause: null,
        growths: [],
      };

    case CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS:
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
      const growthsModels = normalizedObjectModeler(list, 'FreeAsso_CauseGrowth');
      return {
        ...state,
        loadGrowthsPending: false,
        loadGrowthsError: null,
        growths: list,
        cause: action.cause,
        growthsModels: growthsModels
      };

    case CAUSE_GROWTH_LOAD_GROWTHS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadGrowthsPending: false,
        loadGrowthsError: action.data.error,
      };

    case CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadGrowthsError: null,
      };

    default:
      return state;
  }
}
