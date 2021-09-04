import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SET_ONLINE,
} from './constants';

export function setOnline() {
  return {
    type: COMMON_SET_ONLINE,
  };
}

export function useSetOnline() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setOnline(...params)), [dispatch]);
  return { setOnline: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_ONLINE:
      return {
        ...state,
        online: true,
      };

    default:
      return state;
  }
}
