import { freeAssoApi } from '../../../common';
import {
  CONTRACT_DEL_CONTRACT_MEDIA_BEGIN,
  CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS,
  CONTRACT_DEL_CONTRACT_MEDIA_FAILURE,
  CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR,
} from './constants';

export function delContractMedia(ctm_id) {
  return (dispatch) => {
    dispatch({
      type: CONTRACT_DEL_CONTRACT_MEDIA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.delete('/v1/asso/contract_media/' + ctm_id);
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CONTRACT_DEL_CONTRACT_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDelContractMediaError() {
  return {
    type: CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_DEL_CONTRACT_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delContractMediaPending: true,
        delContractMediaError: null,
      };

    case CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        delContractMediaPending: false,
        delContractMediaError: null,
      };

    case CONTRACT_DEL_CONTRACT_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        delContractMediaPending: false,
        delContractMediaError: action.data.error,
      };

    case CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delContractMediaError: null,
      };

    default:
      return state;
  }
}
