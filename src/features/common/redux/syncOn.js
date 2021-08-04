import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SYNC_ON,
} from './constants';

export function syncOn() {
  return {
    type: COMMON_SYNC_ON,
  };
}

export function useSyncOn() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(syncOn(...params)), [dispatch]);
  return { syncOn: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SYNC_ON:
      return {
        ...state,
        syncing: true,
      };

    default:
      return state;
  }
}
