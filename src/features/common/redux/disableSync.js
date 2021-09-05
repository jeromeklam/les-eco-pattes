import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_DISABLE_SYNC,
} from './constants';

export function disableSync() {
  return {
    type: COMMON_DISABLE_SYNC,
  };
}

export function useDisableSync() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(disableSync(...params)), [dispatch]);
  return { disableSync: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_DISABLE_SYNC:
      window.localStorage.setItem('proxy_on', 'no');
      return {
        ...state,
        syncEnabled: false,
      };

    default:
      return state;
  }
}
