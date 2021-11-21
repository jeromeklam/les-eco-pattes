import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { freeAssoApi } from '../../../common';
import {
  CAUSE_CHECK_ONE_MEDIA_BEGIN,
  CAUSE_CHECK_ONE_MEDIA_SUCCESS,
  CAUSE_CHECK_ONE_MEDIA_FAILURE,
  CAUSE_CHECK_ONE_MEDIA_DISMISS_ERROR,
} from './constants';

export function checkOneMedia(id = 0, args = {}) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_CHECK_ONE_MEDIA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/asso/cause_media/check/' + id);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_CHECK_ONE_MEDIA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_CHECK_ONE_MEDIA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissCheckOneMediaError() {
  return {
    type: CAUSE_CHECK_ONE_MEDIA_DISMISS_ERROR,
  };
}

export function useCheckOneMedia() {
  const dispatch = useDispatch();

  const { checkOneMediaPending, checkOneMediaError } = useSelector(
    state => ({
      checkOneMediaPending: state.cause.checkOneMediaPending,
      checkOneMediaError: state.cause.checkOneMediaError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(checkOneMedia(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissCheckOneMediaError());
  }, [dispatch]);

  return {
    checkOneMedia: boundAction,
    checkOneMediaPending,
    checkOneMediaError,
    dismissCheckOneMediaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_CHECK_ONE_MEDIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        checkOneMediaPending: true,
        checkOneMediaError: null,
      };

    case CAUSE_CHECK_ONE_MEDIA_SUCCESS:
      // The request is success
      return {
        ...state,
        checkOneMediaPending: false,
        checkOneMediaError: null,
      };

    case CAUSE_CHECK_ONE_MEDIA_FAILURE:
      // The request is failed
      return {
        ...state,
        checkOneMediaPending: false,
        checkOneMediaError: action.data.error,
      };

    case CAUSE_CHECK_ONE_MEDIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        checkOneMediaError: null,
      };

    default:
      return state;
  }
}
