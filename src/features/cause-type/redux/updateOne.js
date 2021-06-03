import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_TYPE_UPDATE_ONE_BEGIN,
  CAUSE_TYPE_UPDATE_ONE_SUCCESS,
  CAUSE_TYPE_UPDATE_ONE_FAILURE,
  CAUSE_TYPE_UPDATE_ONE_DISMISS_ERROR,
  CAUSE_TYPE_UPDATE_ONE_UPDATE,
} from './constants';

export function updateOne(id, args = {}) {
  return dispatch => {
    dispatch({
      type: CAUSE_TYPE_UPDATE_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/asso/cause_type/' + id, args);
      doRequest.then(
        res => {
          dispatch({
            type: CAUSE_TYPE_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: CAUSE_TYPE_UPDATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateOneError() {
  return {
    type: CAUSE_TYPE_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_TYPE_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case CAUSE_TYPE_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case CAUSE_TYPE_UPDATE_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateOnePending: false,
        updateOneError: error,
      };

    case CAUSE_TYPE_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case CAUSE_TYPE_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_CauseType', object, action.ignoreAdd || false);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
