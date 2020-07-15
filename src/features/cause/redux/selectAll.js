import {
  CAUSE_SELECT_ALL,
} from './constants';

export function selectAll() {
  return {
    type: CAUSE_SELECT_ALL,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_SELECT_ALL:
     console.log("FK liste cause", state.items );
      return {
        ...state,
        selected: [],
      };

    default:
      return state;
  }
}
