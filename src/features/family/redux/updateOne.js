import { jsonApiNormalizer, jsonApiUpdate } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  FAMILY_UPDATE_ONE_UPDATE,
  FAMILY_UPDATE_ONE_BEGIN,
  FAMILY_UPDATE_ONE_SUCCESS,
  FAMILY_UPDATE_ONE_FAILURE,
  FAMILY_UPDATE_ONE_DISMISS_ERROR,
} from './constants';

export function updateOne(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: FAMILY_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      const doRequest = freeAssoApi.put('/v1/asso/family/' + id, args);
      doRequest.then(
        res => {
          dispatch({
            type: FAMILY_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: FAMILY_UPDATE_ONE_FAILURE,
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
    type: FAMILY_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FAMILY_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case FAMILY_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case FAMILY_UPDATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        updateOnePending: false,
        updateOneError: action.data.error,
      };

    case FAMILY_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };
  
    case FAMILY_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = jsonApiUpdate(myItems, 'FreeAsso_Family', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
