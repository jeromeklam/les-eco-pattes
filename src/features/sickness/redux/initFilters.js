import { Filter } from 'react-bootstrap-front';
import { SICKNESS_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: SICKNESS_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SICKNESS_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
