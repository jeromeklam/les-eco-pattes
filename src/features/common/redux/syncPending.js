import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SYNC_PENDING,
} from './constants';

export function syncPending() {
  return {
    type: COMMON_SYNC_PENDING,
  };
}

export function useSyncPending() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(syncPending(...params)), [dispatch]);
  return { syncPending: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SYNC_PENDING:
      return {
        ...state,
        syncReady: false,
      };

    default:
      return state;
  }
}
