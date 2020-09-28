import { freeAssoApi } from '../../../common';
import { buildSingleFromjson } from 'jsonapi-front';
import {
  USER_UPLOAD_AVATAR_BEGIN,
  USER_UPLOAD_AVATAR_SUCCESS,
  USER_UPLOAD_AVATAR_FAILURE,
  USER_UPLOAD_AVATAR_DISMISS_ERROR,
} from './constants';

export function uploadAvatar( user_id = 0, binary = null) {
  return (dispatch) => { 
    dispatch({
      type: USER_UPLOAD_AVATAR_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const datas = {
        user_id: user_id,
        blob: binary,
      };
      const doRequest = freeAssoApi.post(
        '/v1/asso/user_media_blob',
        buildSingleFromjson('FreeAsso_UserMediaBlob', datas),
      );
      doRequest.then(
        (res) => {
          dispatch({
            type: USER_UPLOAD_AVATAR_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: USER_UPLOAD_AVATAR_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUploadAvatarError() {
  return {
    type: USER_UPLOAD_AVATAR_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_UPLOAD_AVATAR_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        uploadAvatarPending: true,
        uploadAvatarError: null,
      };

    case USER_UPLOAD_AVATAR_SUCCESS:
      // The request is success
      return {
        ...state,
        uploadAvatarPending: false,
        uploadAvatarError: null,
      };

    case USER_UPLOAD_AVATAR_FAILURE:
      // The request is failed
      return {
        ...state,
        uploadAvatarPending: false,
        uploadAvatarError: action.data.error,
      };

    case USER_UPLOAD_AVATAR_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        uploadAvatarError: null,
      };

    default:
      return state;
  }
}
