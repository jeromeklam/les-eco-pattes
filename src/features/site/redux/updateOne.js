import { jsonApiNormalizer, normalizedObjectUpdate } from 'freejsonapi';
import {
  SITE_UPDATE_ONE_BEGIN,
  SITE_UPDATE_ONE_SUCCESS,
  SITE_UPDATE_ONE_FAILURE,
  SITE_UPDATE_ONE_DISMISS_ERROR,
  SITE_UPDATE_ONE_UPDATE,
} from './constants';
import { freeAssoApi } from '../../../common';

export function updateOne(args = {}) {
  return dispatch => {
    dispatch({
      type: SITE_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const id = args.data.id;
      const doRequest = freeAssoApi.put('/v1/asso/site/' + id, args);
      doRequest.then(
        res => {
          dispatch({
            type: SITE_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: SITE_UPDATE_ONE_FAILURE,
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
    type: SITE_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case SITE_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case SITE_UPDATE_ONE_FAILURE:
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

    case SITE_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case SITE_UPDATE_ONE_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_Site', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
