import { freeAssoApi } from '../../../common';
import {
  CAUSE_DEL_CAUSE_MEDIA_BEGIN,
  CAUSE_DEL_CAUSE_MEDIA_SUCCESS,
  CAUSE_DEL_CAUSE_MEDIA_FAILURE,
  CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR,
} from './constants';

export function delCauseMedia(caum_id) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_DEL_CAUSE_MEDIA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.delete('/v1/asso/cause_media/' + caum_id);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_DEL_CAUSE_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_DEL_CAUSE_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissDelCauseMediaError() {
  return {
    type: CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_DEL_CAUSE_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delCauseMediaPending: true,
        delCauseMediaError: null,
      };

    case CAUSE_DEL_CAUSE_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        delCauseMediaPending: false,
        delCauseMediaError: null,
      };

    case CAUSE_DEL_CAUSE_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        delCauseMediaPending: false,
        delCauseMediaError: action.data.error,
      };

    case CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delCauseMediaError: null,
      };

    default:
      return state;
  }
}
