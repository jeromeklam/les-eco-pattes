import { Filter } from 'react-bootstrap-front';
import { USER_INIT_FILTERS } from './constants';

export function initFilters() {
  return {
    type: USER_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}