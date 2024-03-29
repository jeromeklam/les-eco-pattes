import { normalizedObjectModeler } from 'jsonapi-front';
import { SITE_SELECT_ALL } from './constants';

export function selectAll() {
  return {
    type: SITE_SELECT_ALL,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_SELECT_ALL:
      let selected = state.selected;
      if (state.items.FreeAsso_Site) {
        const items = normalizedObjectModeler(state.items, 'FreeAsso_Site');
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
