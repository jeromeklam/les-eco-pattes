import { normalizedObjectModeler } from 'jsonapi-tools';
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
      let selected = state.selected;
      if (state.items.FreeAsso_Cause) {
        const items = normalizedObjectModeler(state.items, 'FreeAsso_Cause');
        items.forEach(elem => selected.push(elem.id));
      }
      return {
        ...state,
        selected: selected,
      };

    default:
      return state;
  }
}
