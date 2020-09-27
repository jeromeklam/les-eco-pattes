import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'jsonapi-tools';
import {
  AGENDA_LOAD_RESOURCES_BEGIN,
  AGENDA_LOAD_RESOURCES_SUCCESS,
  AGENDA_LOAD_RESOURCES_FAILURE,
  AGENDA_LOAD_RESOURCES_DISMISS_ERROR,
} from './constants';

export function loadResources(args = {}) {
  return (dispatch) => {
    dispatch({
      type: AGENDA_LOAD_RESOURCES_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const params = {};
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/sso/colleagues' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: AGENDA_LOAD_RESOURCES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AGENDA_LOAD_RESOURCES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadResourcesError() {
  return {
    type: AGENDA_LOAD_RESOURCES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AGENDA_LOAD_RESOURCES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadResourcesPending: true,
        loadResourcesError: null,
      };

    case AGENDA_LOAD_RESOURCES_SUCCESS:
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
      return {
        ...state,
        loadResourcesPending: false,
        loadResourcesError: null,
        resources: normalizedObjectModeler(list, 'FreeSSO_User'),
      };

    case AGENDA_LOAD_RESOURCES_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadResourcesPending: false,
        loadResourcesError: error,
      };

    case AGENDA_LOAD_RESOURCES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadResourcesError: null,
      };

    default:
      return state;
  }
}
