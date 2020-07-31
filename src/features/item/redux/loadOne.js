import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  ITEM_LOAD_ONE_BEGIN,
  ITEM_LOAD_ONE_SUCCESS,
  ITEM_LOAD_ONE_FAILURE,
  ITEM_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: ITEM_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/item/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: ITEM_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ITEM_LOAD_ONE_FAILURE,
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
    type: ITEM_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ITEM_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case ITEM_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let raw = null;
      let object = jsonApiNormalizer(action.data.data);
      raw = normalizedObjectModeler(object, 'FreeAsso_Item', action.id);
      item = normalizedObjectModeler(object, 'FreeAsso_Item', action.id, {eager: true});
      return {
        ...state,
        loadOnePending: false,
        loadOneError: null,
        loadOneItem: item,
        loadOneRaw: raw,
      };

    case ITEM_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneError: action.data.error,
      };

    case ITEM_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
