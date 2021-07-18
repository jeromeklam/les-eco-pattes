import { normalizedObjectModeler } from 'jsonapi-front';
import { CLIENT_SELECT_ALL } from './constants';

export function selectAll() {
  return {
    type: CLIENT_SELECT_ALL,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_SELECT_ALL:
      let selected = state.selected;
      if (state.items.FreeAsso_Client) {
        const items = normalizedObjectModeler(state.items, 'FreeAsso_Client');
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
