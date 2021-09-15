import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  MOVEMENT_LOAD_PENDINGS_BEGIN,
  MOVEMENT_LOAD_PENDINGS_SUCCESS,
  MOVEMENT_LOAD_PENDINGS_FAILURE,
  MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR,
} from './constants';

export function loadPendings(args = {}) {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT_LOAD_PENDINGS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/movement/pendings', {});
      doRequest.then(
        (res) => {
          dispatch({
            type: MOVEMENT_LOAD_PENDINGS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: MOVEMENT_LOAD_PENDINGS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadPendingsError() {
  return {
    type: MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR,
  };
}

export function useLoadPendings() {
  const dispatch = useDispatch();

  const { loadPendingsPending, loadPendingsError } = useSelector(
    state => ({
      loadPendingsPending: state.movement.loadPendingsPending,
      loadPendingsError: state.movement.loadPendingsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadPendings(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadPendingsError());
  }, [dispatch]);

  return {
    loadPendings: boundAction,
    loadPendingsPending,
    loadPendingsError,
    dismissLoadPendingsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_LOAD_PENDINGS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadPendingsPending: true,
        loadPendingsError: null,
      };

    case MOVEMENT_LOAD_PENDINGS_SUCCESS:
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
        loadPendingsPending: false,
        loadPendingsError: null,
        pendings: list,
      };

    case MOVEMENT_LOAD_PENDINGS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadPendingsPending: false,
        loadPendingsError: action.data.error,
      };

    case MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadPendingsError: null,
      };

    default:
      return state;
  }
}
