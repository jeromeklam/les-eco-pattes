import { HOME_INIT_SOCKET } from './constants';

export function initSocket(ws) {
  return {
    type: HOME_INIT_SOCKET,
    ws: ws,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_INIT_SOCKET:
      return {
        ...state,
        socket: action.ws,
      };

    default:
      return state;
  }
}
