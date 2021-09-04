import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_INIT_SOCKET,
} from './constants';

export function initSocket(socket = null) {
  return {
    type: COMMON_INIT_SOCKET,
    socket: socket,
  };
}

export function useInitSocket() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(initSocket(...params)), [dispatch]);
  return { initSocket: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_INIT_SOCKET:
      return {
        ...state,
        socket: action.socket,
        socketEnabled: action.socket ? true : false,
      };

    default:
      return state;
  }
}
