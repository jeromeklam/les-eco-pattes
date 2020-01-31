import { freeAssoApi } from '../../../common';
import { buildSingleFromjson } from 'freejsonapi';
import {
  CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN,
  CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS,
  CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE,
  CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR,
} from './constants';

export function uploadCauseMedia(caum_id, cau_id, binary, filename = '') {
  return (dispatch) => {
    dispatch({
      type: CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const datas = {
        cau_id: cau_id,
        blob: binary,
        title: filename,
      };
      const doRequest = freeAssoApi.post(
        '/v1/asso/cause_media_blob',
        buildSingleFromjson('FreeAsso_CauseMediaBlob', datas),
      );
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissUploadCauseMediaError() {
  return {
    type: CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadCauseMediaPending: true,
        uploadCauseMediaError: null,
      };

    case CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadCauseMediaPending: false,
        uploadCauseMediaError: null,
      };

    case CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadCauseMediaPending: false,
        uploadCauseMediaError: action.data.error,
      };

    case CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadCauseMediaError: null,
      };

    default:
      return state;
  }
}
