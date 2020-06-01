import initialState from './initialState';
import { reducer as loadAllReducer } from './loadAll';
import { reducer as setCoordsReducer } from './setCoords';
import { reducer as initSocketReducer } from './initSocket';
import { reducer as closeSocketReducer } from './closeSocket';
import { reducer as socketConnectedReducer } from './socketConnected';
import { reducer as socketDisconnectedReducer } from './socketDisconnected';

const reducers = [
  loadAllReducer,
  setCoordsReducer,
  initSocketReducer,
  closeSocketReducer,
  socketConnectedReducer,
  socketDisconnectedReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
