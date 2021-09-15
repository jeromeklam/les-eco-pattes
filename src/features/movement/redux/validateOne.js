import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { freeAssoApi } from '../../../common';
import {
  MOVEMENT_VALIDATE_ONE_BEGIN,
  MOVEMENT_VALIDATE_ONE_SUCCESS,
  MOVEMENT_VALIDATE_ONE_FAILURE,
  MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
} from './constants';

export function validateOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: MOVEMENT_VALIDATE_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const id = args;
      const doRequest = freeAssoApi.put('/v1/asso/movement/validate/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: MOVEMENT_VALIDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: MOVEMENT_VALIDATE_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissValidateOneError() {
  return {
    type: MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
  };
}

export function useValidateOne() {
  const dispatch = useDispatch();

  const { validateOnePending, validateOneError } = useSelector(
    state => ({
      validateOnePending: state.movement.validateOnePending,
      validateOneError: state.movement.validateOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(validateOne(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissValidateOneError());
  }, [dispatch]);

  return {
    validateOne: boundAction,
    validateOnePending,
    validateOneError,
    dismissValidateOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_VALIDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        validateOnePending: true,
        validateOneError: null,
      };

    case MOVEMENT_VALIDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        validateOnePending: false,
        validateOneError: null,
      };

    case MOVEMENT_VALIDATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        validateOnePending: false,
        validateOneError: action.data.error,
      };

    case MOVEMENT_VALIDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        validateOneError: null,
      };

    default:
      return state;
  }
}
