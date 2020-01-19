import {
  freeAssoApi,
  jsonApiNormalizer,
  buildModel,
  getPreviousNext,
} from '../../../common';
import {
  CAUSE_TYPE_LOAD_ONE_BEGIN,
  CAUSE_TYPE_LOAD_ONE_SUCCESS,
  CAUSE_TYPE_LOAD_ONE_FAILURE,
  CAUSE_TYPE_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_TYPE_LOAD_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/cause_type/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_TYPE_LOAD_ONE_SUCCESS,
            data: res,
            id: args
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_TYPE_LOAD_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadOneError() {
  return {
    type: CAUSE_TYPE_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_TYPE_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case CAUSE_TYPE_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;      
      let raw = null;
      let itemPrevNext = null;
      let object = jsonApiNormalizer(action.data.data);
      raw = buildModel(object, 'FreeAsso_CauseType', action.id);
      item = buildModel(object, 'FreeAsso_CauseType', action.id, {eager: true});
      itemPrevNext = getPreviousNext(state.items, action.id);
      return {
        ...state,
        loadOnePending: false,
        loadItemPrev: itemPrevNext.prev || null,
        loadOneItem: item,
        loadOneRaw: raw,
        loadItemNext: itemPrevNext.next || null,        
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case CAUSE_TYPE_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: null,        
        loadOneRaw: null,
        loadOneError: action.data.error,
      };

    case CAUSE_TYPE_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
