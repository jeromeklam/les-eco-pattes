import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_MOVEMENT_LOAD_ONE_BEGIN,
  CAUSE_MOVEMENT_LOAD_ONE_SUCCESS,
  CAUSE_MOVEMENT_LOAD_ONE_FAILURE,
  CAUSE_MOVEMENT_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_MOVEMENT_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/cause_movement/' + args, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_MOVEMENT_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_MOVEMENT_LOAD_ONE_FAILURE,
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
    type: CAUSE_MOVEMENT_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MOVEMENT_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case CAUSE_MOVEMENT_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      let emptyItem = state.emptyItem;
      item = normalizedObjectModeler(object, 'FreeAsso_CauseMovement', action.id, {eager: true});
      if (action.id <= 0) {
        emptyItem = {...item};
      }
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
        emptyItem: emptyItem,
      };

    case CAUSE_MOVEMENT_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case CAUSE_MOVEMENT_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
