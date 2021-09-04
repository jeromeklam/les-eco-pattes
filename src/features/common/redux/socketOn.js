import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SOCKET_ON,
} from './constants';

export function socketOn() {
  return {
    type: COMMON_SOCKET_ON,
  };
}

export function useSocketOn() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(socketOn(...params)), [dispatch]);
  return { socketOn: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SOCKET_ON:
      return {
        ...state,
        socketEnabled: true,
      };

    default:
      return state;
  }
}
