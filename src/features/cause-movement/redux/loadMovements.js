import { jsonApiNormalizer, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN,
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS,
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE,
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR,
} from './constants';

export function loadMovements(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          cau_id: {eq: args.id},
        },
        sort: '-camv_ts'
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/cause_movement' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS,
            data: res,
            cause: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadMovementsError() {
  return {
    type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMovementsPending: true,
        loadMovementsError: null,
        cause: null,
      };

    case CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS:
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
        loadMovementsPending: false,
        loadMovementsError: null,
        loadMovementssFinish: true,
        items: list,
        cause: action.cause,
      };

    case CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMovementsPending: false,
        loadMovementsError: action.data.error,
      };

    case CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMovementsError: null,
      };

    default:
      return state;
  }
}
