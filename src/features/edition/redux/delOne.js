import { jsonApiNormalizer } from 'jsonapi-front';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_DEL_ONE_BEGIN,
  EDITION_DEL_ONE_SUCCESS,
  EDITION_DEL_ONE_FAILURE,
  EDITION_DEL_ONE_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function delOne(id = null) {
  return (dispatch) => {
    dispatch({
      type: EDITION_DEL_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.delete('/v1/core/edition/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: EDITION_DEL_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: EDITION_DEL_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissDelOneError() {
  return {
    type: EDITION_DEL_ONE_DISMISS_ERROR,
  };
}

export function useDelOne() {
  const dispatch = useDispatch();

  const { delOnePending, delOneError } = useSelector(
    state => ({
      delOnePending: state.edition.delOnePending,
      delOneError: state.edition.delOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(delOne(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDelOneError());
  }, [dispatch]);

  return {
    delOne: boundAction,
    delOnePending,
    delOneError,
    dismissDelOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_DEL_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        delOnePending: true,
        delOneError: null,
      };

    case EDITION_DEL_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        delOnePending: false,
        delOneError: null,
      };

    case EDITION_DEL_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        delOnePending: false,
        delOneError: error,
      };

    case EDITION_DEL_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        delOneError: null,
      };

    default:
      return state;
  }
}
