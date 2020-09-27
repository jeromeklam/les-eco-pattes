import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  EMAIL_UPDATE_ONE_BEGIN,
  EMAIL_UPDATE_ONE_SUCCESS,
  EMAIL_UPDATE_ONE_FAILURE,
  EMAIL_UPDATE_ONE_DISMISS_ERROR,
  EMAIL_UPDATE_ONE_UPDATE,
} from './constants';

export function updateOne(args = {}) {
  return dispatch => {
    dispatch({
      type: EMAIL_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      const doRequest = freeAssoApi.put('/v1/core/email/' + id, args);
      doRequest.then(
        res => {
          dispatch({
            type: EMAIL_UPDATE_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: EMAIL_UPDATE_ONE_FAILURE,
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
    type: EMAIL_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case EMAIL_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case EMAIL_UPDATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        updateOnePending: false,
        updateOneError: action.data.error,
      };

    case EMAIL_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case EMAIL_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeFW_Email', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
