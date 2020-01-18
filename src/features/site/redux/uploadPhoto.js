import { freeAssoApi } from '../../../common';
import { buildSingleFromjson } from 'freejsonapi';
import {
  SITE_UPLOAD_PHOTO_BEGIN,
  SITE_UPLOAD_PHOTO_SUCCESS,
  SITE_UPLOAD_PHOTO_FAILURE,
  SITE_UPLOAD_PHOTO_DISMISS_ERROR,
} from './constants';


export function uploadPhoto(sitm_id, site_id, binary) {
  return (dispatch) => {
    dispatch({
      type: SITE_UPLOAD_PHOTO_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const datas = {
        site_id: site_id,
        blob: binary,
      };
      const doRequest = freeAssoApi.post(
        '/v1/asso/site_media_blob',
        buildSingleFromjson('FreeAsso_SiteMediaBlob', datas),
      );
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_UPLOAD_PHOTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_UPLOAD_PHOTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissUploadPhotoError() {
  return {
    type: SITE_UPLOAD_PHOTO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_UPLOAD_PHOTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadPhotoPending: true,
        uploadPhotoError: null,
      };

    case SITE_UPLOAD_PHOTO_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadPhotoPending: false,
        uploadPhotoError: null,
      };

    case SITE_UPLOAD_PHOTO_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadPhotoPending: false,
        uploadPhotoError: action.data.error,
      };

    case SITE_UPLOAD_PHOTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadPhotoError: null,
      };

    default:
      return state;
  }
}
