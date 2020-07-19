import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  SITE_LOAD_DOCUMENTS_BEGIN,
  SITE_LOAD_DOCUMENTS_SUCCESS,
  SITE_LOAD_DOCUMENTS_FAILURE,
  SITE_LOAD_DOCUMENTS_DISMISS_ERROR,
} from './constants';

export function loadDocuments(args = {}) {
  return (dispatch) => {
    dispatch({
      type: SITE_LOAD_DOCUMENTS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          site_id: {eq: args},
          sitm_type: {eq: 'OTHER'},
        }
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/site_media' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_LOAD_DOCUMENTS_SUCCESS,
            data: res,
            site_id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SITE_LOAD_DOCUMENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadDocumentsError() {
  return {
    type: SITE_LOAD_DOCUMENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_LOAD_DOCUMENTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadDocumentsPending: true,
        loadDocumentsError: null,
        documents: [],
        documentsModels: [],
        currentItem: null,
      };

    case SITE_LOAD_DOCUMENTS_SUCCESS:
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
      let currentItem = buildModel(state.items, 'FreeAsso_Site', action.site_id);
      const documents = buildModel(list, 'FreeAsso_SiteMedia');
      return {
        ...state,
        loadDocumentsPending: false,
        loadDocumentsError: null,
        loadDocumentsFinish: true,
        documents: list,
        documentsModels: documents,
        currentItem: currentItem,
      };

    case SITE_LOAD_DOCUMENTS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadDocumentsPending: false,
        loadDocumentsError: action.data.error,
      };

    case SITE_LOAD_DOCUMENTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadDocumentsError: null,
      };

    default:
      return state;
  }
}
