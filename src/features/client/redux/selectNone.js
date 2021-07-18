import { CLIENT_SELECT_NONE } from './constants';

export function selectNone() {
  return {
    type: CLIENT_SELECT_NONE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_SELECT_NONE:
      return {
        ...state,
        selected: [],
      };

    default:
      return state;
  }
}
