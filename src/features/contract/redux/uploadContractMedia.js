import { getNewJsonApi } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN,
  CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS,
  CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE,
  CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR,
} from './constants';

export function uploadContractMedia(ctm_id, ct_id, binary, filename = '') {
  return (dispatch) => {
    dispatch({
      type: CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const datas = {
        ct_id: ct_id,
        blob: binary,
        title: filename,
      };
      const doRequest = freeAssoApi.post(
        '/v1/asso/contract_media_blob',
        getNewJsonApi('FreeAsso_ContractMediaBlob', "", datas),
      );
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUploadContractMediaError() {
  return {
    type: CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadContractMediaPending: true,
        uploadContractMediaError: null,
      };

    case CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadContractMediaPending: false,
        uploadContractMediaError: null,
      };

    case CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadContractMediaPending: false,
        uploadContractMediaError: action.data.error,
      };

    case CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadContractMediaError: null,
      };

    default:
      return state;
  }
}
