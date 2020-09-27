import { Filter } from 'react-bootstrap-front';
import { SITE_TYPE_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: SITE_TYPE_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_TYPE_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
