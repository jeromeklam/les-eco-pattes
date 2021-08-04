import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SOCKET_OFF,
} from './constants';

export function socketOff() {
  return {
    type: COMMON_SOCKET_OFF,
  };
}

export function useSocketOff() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(socketOff(...params)), [dispatch]);
  return { socketOff: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SOCKET_OFF:
      return {
        ...state,
        socketEnabled: false,
      };

    default:
      return state;
  }
}
