import { freeAssoApi } from '../../../common';
import {
  SITE_DEL_SITE_MEDIA_BEGIN,
  SITE_DEL_SITE_MEDIA_SUCCESS,
  SITE_DEL_SITE_MEDIA_FAILURE,
  SITE_DEL_SITE_MEDIA_DISMISS_ERROR,
} from './constants';

export function delSiteMedia(sitm_id) {
  return (dispatch) => {
    dispatch({
      type: SITE_DEL_SITE_MEDIA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.delete('/v1/asso/site_media/' + sitm_id);
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_DEL_SITE_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_DEL_SITE_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissDelSiteMediaError() {
  return {
    type: SITE_DEL_SITE_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_DEL_SITE_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delSiteMediaPending: true,
        delSiteMediaError: null,
      };

    case SITE_DEL_SITE_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        delSiteMediaPending: false,
        delSiteMediaError: null,
      };

    case SITE_DEL_SITE_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        delSiteMediaPending: false,
        delSiteMediaError: action.data.error,
      };

    case SITE_DEL_SITE_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delSiteMediaError: null,
      };

    default:
      return state;
  }
}
