import { jsonApiNormalizer } from 'jsonapi-front';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_CREATE_ONE_BEGIN,
  EDITION_CREATE_ONE_SUCCESS,
  EDITION_CREATE_ONE_FAILURE,
  EDITION_CREATE_ONE_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function createOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: EDITION_CREATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/core/edition', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: EDITION_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: EDITION_CREATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissCreateOneError() {
  return {
    type: EDITION_CREATE_ONE_DISMISS_ERROR,
  };
}

export function useCreateOne() {
  const dispatch = useDispatch();

  const { createOnePending, createOneError } = useSelector(
    state => ({
      createOnePending: state.edition.createOnePending,
      createOneError: state.edition.createOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(createOne(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissCreateOneError());
  }, [dispatch]);

  return {
    createOne: boundAction,
    createOnePending,
    createOneError,
    dismissCreateOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case EDITION_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case EDITION_CREATE_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        createOnePending: false,
        createOneError: error,
      };

    case EDITION_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
