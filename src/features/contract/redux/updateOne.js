import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  CONTRACT_UPDATE_ONE_BEGIN,
  CONTRACT_UPDATE_ONE_SUCCESS,
  CONTRACT_UPDATE_ONE_FAILURE,
  CONTRACT_UPDATE_ONE_DISMISS_ERROR,
  CONTRACT_UPDATE_ONE_UPDATE,
} from './constants';

export function updateOne(id, args = {}) {
  return (dispatch) => {
    dispatch({
      type: CONTRACT_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/asso/contract/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRACT_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CONTRACT_UPDATE_ONE_FAILURE,
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
    type: CONTRACT_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case CONTRACT_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case CONTRACT_UPDATE_ONE_FAILURE:
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

    case CONTRACT_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case CONTRACT_UPDATE_ONE_UPDATE:
      // Dismiss the request failure error
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_Contract', object, false);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };


    default:
      return state;
  }
}
