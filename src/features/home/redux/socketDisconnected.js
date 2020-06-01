import { HOME_SOCKET_DISCONNECTED } from './constants';

export function socketDisconnected() {
  return {
    type: HOME_SOCKET_DISCONNECTED,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SOCKET_DISCONNECTED:
      return {
        ...state,
        socketConnected: false,
        socketMessage: null,
      };

    default:
      return state;
  }
}
