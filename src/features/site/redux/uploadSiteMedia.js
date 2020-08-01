import { getNewJsonApi } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  SITE_UPLOAD_SITE_MEDIA_BEGIN,
  SITE_UPLOAD_SITE_MEDIA_SUCCESS,
  SITE_UPLOAD_SITE_MEDIA_FAILURE,
  SITE_UPLOAD_SITE_MEDIA_DISMISS_ERROR,
} from './constants';


export function uploadSiteMedia(sitm_id, site_id, binary, filename = '') {
  return (dispatch) => {
    dispatch({
      type: SITE_UPLOAD_SITE_MEDIA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const datas = {
        site_id: site_id,
        blob: binary,
        title: filename,
      };
      const doRequest = freeAssoApi.post(
        '/v1/asso/site_media_blob',
        getNewJsonApi('FreeAsso_SiteMediaBlob', "", datas),
      );
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_UPLOAD_SITE_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_UPLOAD_SITE_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      )
      .catch(error => {
        dispatch({
          type: SITE_UPLOAD_SITE_MEDIA_FAILURE,
          data: { error: error },
        });
        reject(error);
      });
    });
    return promise;
  };
}

export function dismissUploadSiteMediaError() {
  return {
    type: SITE_UPLOAD_SITE_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_UPLOAD_SITE_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadSiteMediaPending: true,
        uploadSiteMediaError: null,
      };

    case SITE_UPLOAD_SITE_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadSiteMediaPending: false,
        uploadSiteMediaError: null,
      };

    case SITE_UPLOAD_SITE_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadSiteMediaPending: false,
        uploadSiteMediaError: action.data.error,
      };

    case SITE_UPLOAD_SITE_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadSiteMediaError: null,
      };

    default:
      return state;
  }
}
