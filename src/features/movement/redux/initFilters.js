import { Filter } from 'freeassofront';
import { MOVEMENT_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: MOVEMENT_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
