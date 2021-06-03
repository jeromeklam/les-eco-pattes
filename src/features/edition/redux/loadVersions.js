import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'jsonapi-front';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_LOAD_VERSIONS_INIT,
  EDITION_LOAD_VERSIONS_BEGIN,
  EDITION_LOAD_VERSIONS_SUCCESS,
  EDITION_LOAD_VERSIONS_FAILURE,
  EDITION_LOAD_VERSIONS_DISMISS_ERROR,
} from './constants';

export function loadVersions(id = 0, reload = false) {
  return (dispatch, getState) => {
     const loaded =  getState().cause.loadPhotosFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: EDITION_LOAD_VERSIONS_INIT,
        });
      } else {
        dispatch({
          type: EDITION_LOAD_VERSIONS_BEGIN,
        });
      }
      const promise = new Promise((resolve, reject) => {
        const filter = {
          filter: {
            edi_id: { eq: id },
          }
        }
        const addUrl = objectToQueryString(filter);
        const doRequest = freeAssoApi.get('/v1/core/edition_lang' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: EDITION_LOAD_VERSIONS_SUCCESS,
              data: res,
              edi_id: id,
            });
            resolve(res);
          },
          (err) => {
            dispatch({
              type: EDITION_LOAD_VERSIONS_FAILURE,
              data: { error: err },
              edi_id: id,
            });
            reject(err);
          },
        );
      });
      return promise;
    }
  };
}

export function dismissLoadVersionsError() {
  return {
    type: EDITION_LOAD_VERSIONS_DISMISS_ERROR,
  };
}

export function useLoadVersions() {
  const dispatch = useDispatch();

  const { loadVersionsPending, loadVersionsError } = useSelector(
    state => ({
      loadVersionsPending: state.edition.loadVersionsPending,
      loadVersionsError: state.edition.loadVersionsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadVersions(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadVersionsError());
  }, [dispatch]);

  return {
    loadVersions: boundAction,
    loadVersionsPending,
    loadVersionsError,
    dismissLoadVersionsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_LOAD_VERSIONS_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadVersionsPending: true,
        loadVersionsError: null,
        versions: [],
      };

    case EDITION_LOAD_VERSIONS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadVersionsPending: true,
        loadVersionsError: null,
      };

    case EDITION_LOAD_VERSIONS_SUCCESS:
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
      }
      return {
        ...state,
        loadVersionsPending: false,
        loadVersionsError: null,
        versions: list,
      };

    case EDITION_LOAD_VERSIONS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadVersionsPending: false,
        loadVersionsError: action.data.error,
      };

    case EDITION_LOAD_VERSIONS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadVersionsError: null,
      };

    default:
      return state;
  }
}
