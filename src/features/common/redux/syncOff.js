import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SYNC_OFF,
} from './constants';

export function syncOff() {
  return {
    type: COMMON_SYNC_OFF,
  };
}

export function useSyncOff() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(syncOff(...params)), [dispatch]);
  return { syncOff: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SYNC_OFF:
      return {
        ...state,
        syncing: false,
      };

    default:
      return state;
  }
}
