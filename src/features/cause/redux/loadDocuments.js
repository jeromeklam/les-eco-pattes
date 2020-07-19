import { jsonApiNormalizer, objectToQueryString, buildModel } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_LOAD_DOCUMENTS_BEGIN,
  CAUSE_LOAD_DOCUMENTS_SUCCESS,
  CAUSE_LOAD_DOCUMENTS_FAILURE,
  CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR,
} from './constants';

export function loadDocuments(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_LOAD_DOCUMENTS_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const filter = {
        filter: {
          cau_id: {eq: args},
          caum_type: {eq : 'OTHER'},
        }
      }
      const addUrl = objectToQueryString(filter);
      const doRequest = freeAssoApi.get('/v1/asso/cause_media' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_LOAD_DOCUMENTS_SUCCESS,
            data: res,
            cau_id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_LOAD_DOCUMENTS_FAILURE,
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
    type: CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_LOAD_DOCUMENTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadDocumentsPending: true,
        loadDocumentsError: null,
      };

    case CAUSE_LOAD_DOCUMENTS_SUCCESS:
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
      let currentItem = buildModel(state.items, 'FreeAsso_Cause', action.cau_id);
      return {
        ...state,
        loadDocumentsPending: false,
        loadDocumentsError: null,
        loadDocumentsFinish: true,
        documents: list,
        currentItem: currentItem,
      };

    case CAUSE_LOAD_DOCUMENTS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadDocumentsPending: false,
        loadDocumentsError: action.data.error,
      };

    case CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadDocumentsError: null,
      };

    default:
      return state;
  }
}
