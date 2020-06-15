import { Filter, FILTER_MODE_AND, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL } from 'freeassofront';
import { SITE_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: SITE_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_INIT_FILTERS:
      let newFilters = new Filter();
      const now = new Date().toISOString();
      newFilters.addFilter('site_to', now, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL);
      newFilters.setMode(FILTER_MODE_AND);
      return {
        ...state,
        filters: newFilters,
      };

    default:
      return state;
  }
}
