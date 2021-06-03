import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_LOAD_ONE_BEGIN,
  EDITION_LOAD_ONE_SUCCESS,
  EDITION_LOAD_ONE_FAILURE,
  EDITION_LOAD_ONE_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadOne(id = null) {
  return dispatch => {
    dispatch({
      type: EDITION_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/edition/' + id);
      doRequest.then(
        res => {
          dispatch({
            type: EDITION_LOAD_ONE_SUCCESS,
            data: res,
            id: id,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: EDITION_LOAD_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissLoadOneError() {
  return {
    type: EDITION_LOAD_ONE_DISMISS_ERROR,
  };
}

export function useLoadOne() {
  const dispatch = useDispatch();

  const { loadOnePending, loadOneError } = useSelector(
    state => ({
      loadOnePending: state.edition.loadOnePending,
      loadOneError: state.edition.loadOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(loadOne(...args));
    },
    [dispatch],
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadOneError());
  }, [dispatch]);

  return {
    loadOne: boundAction,
    loadOnePending,
    loadOneError,
    dismissLoadOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
        delOneError: null,
      };

    case EDITION_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = normalizedObjectModeler(object, 'FreeFW_Edition', action.id, { eager: true });
      return {
        ...state,
        loadOnePending: false,
        loadOneError: null,
        loadOneItem: item,
      };

    case EDITION_LOAD_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadOnePending: false,
        loadOneError: error,
      };

    case EDITION_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
