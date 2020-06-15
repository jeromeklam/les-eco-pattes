import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import {
  CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN,
  CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS,
  CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE,
  CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadSicknesses(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          cau_id: {eq: args.id},
        },
        sort: '-caus_from'
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/cause_sickness' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS,
            data: res,
            cause: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadSicknessesError() {
  return {
    type: CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadSicknessesPending: true,
        loadSicknessesError: null,
        cause: null,
        sicknesses: [],
        sicknessesModels: [],
      };

    case CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS:
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
      const sicknessesModels = buildModel(list, 'FreeAsso_CauseSickness');
      return {
        ...state,
        loadSicknessesPending: false,
        loadSicknessesError: null,
        sicknesses: list,
        cause: action.cause,
        sicknessesModels: sicknessesModels
      };

    case CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE:
      // The request is failed
      return {
        ...state,
        loadSicknessesPending: false,
        loadSicknessesError: action.data.error,
      };

    case CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadSicknessesError: null,
      };

    default:
      return state;
  }
}
