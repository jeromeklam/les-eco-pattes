import { CAUSE_ON_SELECT } from './constants';

export function onSelect(id) {
  return {
    type: CAUSE_ON_SELECT,
    id: id,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_ON_SELECT:
      const { selected } = state;
      let filteredItems = [];
      const found = selected.find(elem => elem === action.id);
      if (found) {
        filteredItems = selected.filter(elem => elem !== action.id)
      } else {
        filteredItems = selected;
        filteredItems.push(action.id);
      }
      return {
        ...state,
        selected: filteredItems,
      };

    default:
      return state;
  }
}
