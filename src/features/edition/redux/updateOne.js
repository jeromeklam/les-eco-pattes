import { jsonApiNormalizer } from 'jsonapi-front';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  EDITION_UPDATE_ONE_BEGIN,
  EDITION_UPDATE_ONE_SUCCESS,
  EDITION_UPDATE_ONE_FAILURE,
  EDITION_UPDATE_ONE_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function updateOne(id, args = {}) {
  return (dispatch) => {
    dispatch({
      type: EDITION_UPDATE_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/core/edition/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: EDITION_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: EDITION_UPDATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissUpdateOneError() {
  return {
    type: EDITION_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function useUpdateOne() {
  const dispatch = useDispatch();

  const { updateOnePending, updateOneError } = useSelector(
    state => ({
      updateOnePending: state.edition.updateOnePending,
      updateOneError: state.edition.updateOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateOne(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateOneError());
  }, [dispatch]);

  return {
    updateOne: boundAction,
    updateOnePending,
    updateOneError,
    dismissUpdateOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case EDITION_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case EDITION_UPDATE_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateOnePending: false,
        updateOneError: error,
      };

    case EDITION_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    default:
      return state;
  }
}
