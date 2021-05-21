import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_LOAD_ONE_VERSION_BEGIN,
  EDITION_LOAD_ONE_VERSION_SUCCESS,
  EDITION_LOAD_ONE_VERSION_FAILURE,
  EDITION_LOAD_ONE_VERSION_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function loadOneVersion(id = 0) {
  return (dispatch) => {
    dispatch({
      type: EDITION_LOAD_ONE_VERSION_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/edition_lang/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: EDITION_LOAD_ONE_VERSION_SUCCESS,
            data: res,
            id: id,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: EDITION_LOAD_ONE_VERSION_FAILURE,
            data: { error: err },
            id: id,
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadOneVersionError() {
  return {
    type: EDITION_LOAD_ONE_VERSION_DISMISS_ERROR,
  };
}

export function useLoadOneVersion() {
  const dispatch = useDispatch();

  const { loadOneVersionPending, loadOneVersionError } = useSelector(
    state => ({
      loadOneVersionPending: state.edition.loadOneVersionPending,
      loadOneVersionError: state.edition.loadOneVersionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadOneVersion(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadOneVersionError());
  }, [dispatch]);

  return {
    loadOneVersion: boundAction,
    loadOneVersionPending,
    loadOneVersionError,
    dismissLoadOneVersionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_LOAD_ONE_VERSION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOneVersionPending: true,
        loadOneVersionError: null,
        version: null,
      };

    case EDITION_LOAD_ONE_VERSION_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      let empty = state.emptyVersion;
      item = normalizedObjectModeler(object, 'FreeFW_EditionLang', action.id, { eager: true });
      if (action.id == 0) {
        empty = {...item};
      }
      return {
        ...state,
        loadOneVersionPending: false,
        loadOneVersionError: null,
        emptyVersion: empty,
        version: item,
      };

    case EDITION_LOAD_ONE_VERSION_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOneVersionPending: false,
        loadOneVersionError: action.data.error,
      };

    case EDITION_LOAD_ONE_VERSION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneVersionError: null,
      };

    default:
      return state;
  }
}
