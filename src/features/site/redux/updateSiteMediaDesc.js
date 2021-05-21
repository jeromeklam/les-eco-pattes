import { jsonApiNormalizer, normalizedObjectUpdate, getNewJsonApi } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  SITE_UPDATE_SITE_MEDIA_DESC_BEGIN,
  SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS,
  SITE_UPDATE_SITE_MEDIA_DESC_FAILURE,
  SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR,
} from './constants';

export function updateSiteMediaDesc(sitm_id, site_id, desc) {
  return (dispatch) => {
    dispatch({
      type: SITE_UPDATE_SITE_MEDIA_DESC_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const args = {
        site_id: site_id,
        desc: desc,
      };
      const doRequest = freeAssoApi.put('/v1/asso/site_media/description/' + sitm_id, getNewJsonApi('FreeAsso_SiteMediaBlob', "", args));
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_UPDATE_SITE_MEDIA_DESC_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateSiteMediaDescError() {
  return {
    type: SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_UPDATE_SITE_MEDIA_DESC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateSiteMediaDescPending: true,
        updateSiteMediaDescError: null,
      };

    case SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS:
      // The request is success
      return {
        ...state,
        updateSiteMediaDescPending: false,
        updateSiteMediaDescError: null,
      };

    case SITE_UPDATE_SITE_MEDIA_DESC_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateSiteMediaDescPending: false,
        updateSiteMediaDescError: error,
      };

    case SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateSiteMediaDescError: null,
      };

    default:
      return state;
  }
}
