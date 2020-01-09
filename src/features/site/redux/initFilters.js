import { Filter } from 'freeassofront';
import { SITE_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: SITE_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
