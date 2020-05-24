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
      let newFilters = new Filter();
      const now = new Date().toISOString();
      newFilters.addFilter('cau_to', now, 'gten');
      return {
        ...state,
        filters: newFilters,
      };

    default:
      return state;
  }
}
