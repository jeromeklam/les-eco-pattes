import { CONTRACT_INIT_FILTERS } from './constants';
import { Filter } from 'freeassofront';

export function initFilters() {
  return {
    type: CONTRACT_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
