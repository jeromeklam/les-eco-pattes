import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SET_OFFLINE,
} from './constants';

export function setOffline() {
  return {
    type: COMMON_SET_OFFLINE,
  };
}

export function useSetOffline() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setOffline(...params)), [dispatch]);
  return { setOffline: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_OFFLINE:
      return {
        ...state,
        online: false,
      };

    default:
      return state;
  }
}
