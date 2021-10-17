import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_LOAD_TIMERS_BEGIN,
  HOME_LOAD_TIMERS_SUCCESS,
  HOME_LOAD_TIMERS_FAILURE,
  HOME_LOAD_TIMERS_DISMISS_ERROR,
} from './constants';
import { loadMore as loadMoreInbox } from '../../inbox/redux/loadMore';
import { loadMore as loadMoreJobqueue } from '../../jobqueue/redux/loadMore';

export function loadTimers(args = {}) {
  return dispatch => {
    dispatch({
      type: HOME_LOAD_TIMERS_BEGIN,
    });
    const promise = Promise.all([
      dispatch(loadMoreJobqueue(true)),
      dispatch(loadMoreInbox(true)),
    ]);
    return promise.then(
      res => {
        dispatch({
          type: HOME_LOAD_TIMERS_SUCCESS,
          data: res,
        });
      },
      err => {
        dispatch({
          type: HOME_LOAD_TIMERS_FAILURE,
          data: { error: err },
        });
      },
    );
  };
}
export function dismissLoadTimersError() {
  return {
    type: HOME_LOAD_TIMERS_DISMISS_ERROR,
  };
}

export function useLoadTimers() {
  const dispatch = useDispatch();

  const { loadTimersPending, loadTimersError } = useSelector(
    state => ({
      loadTimersPending: state.home.loadTimersPending,
      loadTimersError: state.home.loadTimersError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(loadTimers(...args));
    },
    [dispatch],
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadTimersError());
  }, [dispatch]);

  return {
    loadTimers: boundAction,
    loadTimersPending,
    loadTimersError,
    dismissLoadTimersError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOAD_TIMERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadTimersPending: true,
        loadTimersError: null,
      };

    case HOME_LOAD_TIMERS_SUCCESS:
      // The request is success
      return {
        ...state,
        loadTimersPending: false,
        loadTimersError: null,
      };

    case HOME_LOAD_TIMERS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadTimersPending: false,
        loadTimersError: action.data.error,
      };

    case HOME_LOAD_TIMERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadTimersError: null,
      };

    default:
      return state;
  }
}
