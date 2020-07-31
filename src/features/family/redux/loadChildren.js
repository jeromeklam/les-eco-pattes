import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi } from '../../../common';
import {
  FAMILY_LOAD_CHILDREN_INIT,
  FAMILY_LOAD_CHILDREN_BEGIN,
  FAMILY_LOAD_CHILDREN_SUCCESS,
  FAMILY_LOAD_CHILDREN_FAILURE,
  FAMILY_LOAD_CHILDREN_DISMISS_ERROR,
} from './constants';

export function loadChildren(args = {}, reload = false) {
  return (dispatch, getState) => {
    const loaded =  getState().email.loadMoreFinish;
    const loading =  getState().email.loadMorePending;
    if (!loading && (!loaded || reload)) {
      if (reload) {
        dispatch({
          type: FAMILY_LOAD_CHILDREN_INIT,
        });
      } else {
        dispatch({
          type: FAMILY_LOAD_CHILDREN_BEGIN,
          ...args,
        });
      }
      const promise = new Promise((resolve, reject) => {
        let id = 0;
        if (args && args.parent_id) {
          id = args.parent_id;
        }
        const doRequest = freeAssoApi.get('/v1/asso/family/children/' + id, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: FAMILY_LOAD_CHILDREN_SUCCESS,
              data: res,
              ...args,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: FAMILY_LOAD_CHILDREN_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
      });
      return promise;
    }
  };
}

export function dismissLoadChildrenError() {
  return {
    type: FAMILY_LOAD_CHILDREN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FAMILY_LOAD_CHILDREN_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadChildrenPending: false,
        loadChildrenError: null,
        items: [],
      };

    case FAMILY_LOAD_CHILDREN_BEGIN:
      // Just after a request is sent
      let id = 0;
      if (action.parent_id) {
        id = action.parent_id;
      }
      let treeB = state.tree;
      treeB.addLoading(id);
      return {
        ...state,
        loadChildrenPending: true,
        loadChildrenError: null,
        tree: treeB,
      };

    case FAMILY_LOAD_CHILDREN_SUCCESS:
      // The request is success
      let id2 = 0;
      if (action.parent_id) {
        id2 = action.parent_id;
      }
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
        if (state.items) {
          list = jsonApiNormalizer(result, state.items);
        } else {
          list = jsonApiNormalizer(result);
        }
      } else {
        list = state.items;
      }
      const models = normalizedObjectModeler(list, 'FreeAsso_Family');
      let tree = state.tree;
      tree.setData(models);
      tree.addLoaded(id2);
      return {
        ...state,
        loadChildrenPending: false,
        loadChildrenError: null,
        items: list,
        tree: tree,
      };

    case FAMILY_LOAD_CHILDREN_FAILURE:
      // The request is failed
      return {
        ...state,
        loadChildrenPending: false,
        loadChildrenError: action.data.error,
      };

    case FAMILY_LOAD_CHILDREN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadChildrenError: null,
      };

    default:
      return state;
  }
}
