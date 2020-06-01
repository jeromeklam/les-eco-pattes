import { HOME_SOCKET_CONNECTED } from './constants';

export function socketConnected(msg) {
  return {
    type: HOME_SOCKET_CONNECTED,
    msg: msg,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SOCKET_CONNECTED:
      return {
        ...state,
        socketConnected: true,
        socketMessage: action.msg,
      };

    default:
      return state;
  }
}
