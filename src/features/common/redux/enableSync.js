import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_ENABLE_SYNC,
} from './constants';

export function enableSync() {
  return {
    type: COMMON_ENABLE_SYNC,
  };
}

export function useEnableSync() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(enableSync(...params)), [dispatch]);
  return { enableSync: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_ENABLE_SYNC:
      window.localStorage.setItem('proxy_on', 'yes');
      return {
        ...state,
        syncEnabled: true,
      };

    default:
      return state;
  }
}
