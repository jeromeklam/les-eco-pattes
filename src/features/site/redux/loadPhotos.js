import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'jsonapi-tools';
import { freeAssoApi } from '../../../common';
import {
  SITE_LOAD_PHOTOS_BEGIN,
  SITE_LOAD_PHOTOS_SUCCESS,
  SITE_LOAD_PHOTOS_FAILURE,
  SITE_LOAD_PHOTOS_DISMISS_ERROR,
} from './constants';

export function loadPhotos(args = {}) {
  return (dispatch) => {
    dispatch({
      type: SITE_LOAD_PHOTOS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          site_id: {eq: args},
          sitm_type: {eq: 'PHOTO'},
        }
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/site_media' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_LOAD_PHOTOS_SUCCESS,
            data: res,
            site_id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_LOAD_PHOTOS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadPhotosError() {
  return {
    type: SITE_LOAD_PHOTOS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_LOAD_PHOTOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadPhotosPending: true,
        loadPhotosError: null,
        photos: [],
        currentItem: null,
      };

    case SITE_LOAD_PHOTOS_SUCCESS:
      // The request is success
      let list = {};
      let nbre = 0;
      let result = false;
      if (action.data && action.data.data) {
        result = action.data.data;
      }
      if (result.data) {
        nbre = result.data.length;
      }
      if (nbre > 0) {
        list = jsonApiNormalizer(result);
      } else {
        list = [];
      }
      let currentItem = normalizedObjectModeler(state.items, 'FreeAsso_Site', action.site_id);
      return {
        ...state,
        loadPhotosPending: false,
        loadPhotosError: null,
        loadPhotosFinish: true,
        photos: list,
        currentItem: currentItem,
      };

    case SITE_LOAD_PHOTOS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadPhotosPending: false,
        loadPhotosError: action.data.error,
      };

    case SITE_LOAD_PHOTOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadPhotosError: null,
      };

    default:
      return state;
  }
}
