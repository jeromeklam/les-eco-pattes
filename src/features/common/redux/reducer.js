// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as toggleSidebarReducer } from './toggleSidebar';
import { reducer as setCoordsReducer } from './setCoords';
import { reducer as setLocaleReducer } from './setLocale';
import { reducer as setOnlineReducer } from './setOnline';
import { reducer as setOfflineReducer } from './setOffline';
import { reducer as syncOnReducer } from './syncOn';
import { reducer as syncOffReducer } from './syncOff';
import { reducer as enableSyncReducer } from './enableSync';
import { reducer as disableSyncReducer } from './disableSync';
import { reducer as closeSocketReducer } from './closeSocket';
import { reducer as initSocketReducer } from './initSocket';
import { reducer as socketOnReducer } from './socketOn';
import { reducer as socketOffReducer } from './socketOff';
import { reducer as toggleRightPanelReducer } from './toggleRightPanel';
import { reducer as setFiltersColsReducer } from './setFiltersCols';
import { reducer as setPanelReducer } from './setPanel';

const reducers = [
  toggleSidebarReducer,
  setCoordsReducer,
  setLocaleReducer,
  setOnlineReducer,
  setOfflineReducer,
  syncOnReducer,
  syncOffReducer,
  enableSyncReducer,
  disableSyncReducer,
  closeSocketReducer,
  initSocketReducer,
  socketOnReducer,
  socketOffReducer,
  toggleRightPanelReducer,
  setFiltersColsReducer,
  setPanelReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
