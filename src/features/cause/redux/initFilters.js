import { Filter } from 'freeassofront';
import { CAUSE_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: CAUSE_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}