import { HOME_CLOSE_SOCKET } from './constants';

export function closeSocket() {
  return {
    type: HOME_CLOSE_SOCKET,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CLOSE_SOCKET:
      if (state.socket) {
        try {
          state.socket.disconnect();
        } catch (ex) {}
      }
      return {
        ...state,
        socket: null,
      };

    default:
      return state;
  }
}
