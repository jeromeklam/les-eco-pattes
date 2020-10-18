// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as checkIsAuthenticatedReducer } from './checkIsAuthenticated';
import { reducer as signInReducer } from './signIn';
import { reducer as signOutReducer } from './signOut';
import { reducer as askPasswordReducer } from './askPassword';
import { reducer as changePasswordReducer } from './changePassword';
import { reducer as updateOneReducer } from './updateOne';
import { reducer as updatePasswordReducer } from './updatePassword';
import { reducer as updateConfigReducer } from './updateConfig';
import { reducer as changeSettingReducer } from './changeSetting';
import { reducer as propagateReducer } from './propagate';

const reducers = [
  checkIsAuthenticatedReducer,
  signInReducer,
  signOutReducer,
  askPasswordReducer,
  changePasswordReducer,
  updateOneReducer,
  updatePasswordReducer,
  updateConfigReducer,
  changeSettingReducer,
  propagateReducer,
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
