import { Filter } from 'react-bootstrap-front';
import { DATA_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: DATA_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
