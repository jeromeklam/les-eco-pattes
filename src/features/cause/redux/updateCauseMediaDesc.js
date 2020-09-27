import { jsonApiNormalizer, normalizedObjectUpdate, getNewJsonApi } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_UPDATE_CAUSE_MEDIA_DESC_BEGIN,
  CAUSE_UPDATE_CAUSE_MEDIA_DESC_SUCCESS,
  CAUSE_UPDATE_CAUSE_MEDIA_DESC_FAILURE,
  CAUSE_UPDATE_CAUSE_MEDIA_DESC_DISMISS_ERROR,
  CAUSE_UPDATE_CAUSE_MEDIA_DESC_UPDATE,
} from './constants';

export function updateCauseMediaDesc(caum_id, cause_id, desc) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_UPDATE_CAUSE_MEDIA_DESC_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const args = {
        cau_id: cause_id,
        desc: desc,
      };
      const doRequest = freeAssoApi.put('/v1/asso/cause_media/description/' + caum_id, getNewJsonApi('FreeAsso_CauseMediaBlob', "", args));
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_UPDATE_CAUSE_MEDIA_DESC_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_UPDATE_CAUSE_MEDIA_DESC_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateCauseMediaDescError() {
  return {
    type: CAUSE_UPDATE_CAUSE_MEDIA_DESC_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_UPDATE_CAUSE_MEDIA_DESC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateCauseMediaDescPending: true,
        updateCauseMediaDescError: null,
      };

    case CAUSE_UPDATE_CAUSE_MEDIA_DESC_SUCCESS:
      // The request is success
      return {
        ...state,
        updateCauseMediaDescPending: false,
        updateCauseMediaDescError: null,
      };

    case CAUSE_UPDATE_CAUSE_MEDIA_DESC_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateCauseMediaDescPending: false,
        updateCauseMediaDescError: error,
      };

    case CAUSE_UPDATE_CAUSE_MEDIA_DESC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateCauseMediaDescError: null,
      };

    case CAUSE_UPDATE_CAUSE_MEDIA_DESC_UPDATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;      
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_CauseMediaBlob', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
