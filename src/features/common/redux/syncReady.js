import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SYNC_READY,
} from './constants';

export function syncReady() {
  return {
    type: COMMON_SYNC_READY,
  };
}

export function useSyncReady() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(syncReady(...params)), [dispatch]);
  return { syncReady: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SYNC_READY:
      return {
        ...state,
        syncReady: true,
      };

    default:
      return state;
  }
}
