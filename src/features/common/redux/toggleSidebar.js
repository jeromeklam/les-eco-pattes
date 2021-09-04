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
