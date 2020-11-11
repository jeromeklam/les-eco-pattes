import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_LOAD_PUBLIC_BEGIN,
  HOME_LOAD_PUBLIC_SUCCESS,
  HOME_LOAD_PUBLIC_FAILURE,
  HOME_LOAD_PUBLIC_DISMISS_ERROR,
} from './constants';
import { loadMore as loadMoreDashboard } from '../../dashboard/redux/loadMore';

export function loadPublic(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_LOAD_PUBLIC_BEGIN,
    });
    const promise = Promise.all([dispatch(loadMoreDashboard())]);
    return promise.then(
      res => {
        dispatch({
          type: HOME_LOAD_PUBLIC_SUCCESS,
          data: res,
        });
      },
      err => {
        dispatch({
          type: HOME_LOAD_PUBLIC_FAILURE,
          data: { error: err },
        });
      },
    );
  };
}

export function dismissLoadPublicError() {
  return {
    type: HOME_LOAD_PUBLIC_DISMISS_ERROR,
  };
}

export function useLoadPublic() {
  const dispatch = useDispatch();

  const { loadPublicPending, loadPublicError } = useSelector(
    state => ({
      loadPublicPending: state.home.loadPublicPending,
      loadPublicError: state.home.loadPublicError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(loadPublic(...args));
    },
    [dispatch],
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadPublicError());
  }, [dispatch]);

  return {
    loadPublic: boundAction,
    loadPublicPending,
    loadPublicError,
    dismissLoadPublicError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOAD_PUBLIC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadPublicPending: true,
        loadPublicError: null,
      };

    case HOME_LOAD_PUBLIC_SUCCESS:
      // The request is success
      return {
        ...state,
        loadPublicPending: false,
        loadPublicError: null,
      };

    case HOME_LOAD_PUBLIC_FAILURE:
      // The request is failed
      return {
        ...state,
        loadPublicPending: false,
        loadPublicError: action.data.error,
      };

    case HOME_LOAD_PUBLIC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadPublicError: null,
      };

    default:
      return state;
  }
}
