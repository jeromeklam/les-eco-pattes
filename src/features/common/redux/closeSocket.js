import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_CLOSE_SOCKET,
} from './constants';

export function closeSocket() {
  return {
    type: COMMON_CLOSE_SOCKET,
  };
}

export function useCloseSocket() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(closeSocket(...params)), [dispatch]);
  return { closeSocket: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CLOSE_SOCKET:
      return {
        ...state,
        socket: null,
        socketEnabled: false,
      };

    default:
      return state;
  }
}
