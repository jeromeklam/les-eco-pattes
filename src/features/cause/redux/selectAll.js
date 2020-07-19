import { buildModel } from 'freejsonapi';
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
      let items = [];
      if (state.items.FreeAsso_Cause) {
        items = buildModel(state.items, 'FreeAsso_Cause');
      }
      return {
        ...state,
        selected: items,
      };

    default:
      return state;
  }
}
