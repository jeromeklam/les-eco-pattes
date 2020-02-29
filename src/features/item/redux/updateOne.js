import { jsonApiNormalizer, jsonApiUpdate } from 'freejsonapi';
import {
  ITEM_UPDATE_ONE_BEGIN,
  ITEM_UPDATE_ONE_SUCCESS,
  ITEM_UPDATE_ONE_FAILURE,
  ITEM_UPDATE_ONE_DISMISS_ERROR,
  ITEM_UPDATE_ONE_UPDATE,
} from './constants';
import { freeAssoApi } from '../../../common';

export function updateOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: ITEM_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      const doRequest = freeAssoApi.put('/v1/asso/item/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: ITEM_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ITEM_UPDATE_ONE_FAILURE,
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
    type: ITEM_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ITEM_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case ITEM_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case ITEM_UPDATE_ONE_FAILURE:
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

    case ITEM_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case ITEM_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = jsonApiUpdate(myItems, 'FreeAsso_Item', object);
      console.log(myItems, news);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
