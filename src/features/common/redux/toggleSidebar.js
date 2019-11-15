// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_TOGGLE_SIDEBAR,
} from './constants';

export function toggleSidebar() {
  return {
    type: COMMON_TOGGLE_SIDEBAR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar,
      };

    default:
      return state;
  }
}
