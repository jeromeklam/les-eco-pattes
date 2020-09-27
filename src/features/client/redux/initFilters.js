import { CLIENT_INIT_FILTERS } from './constants';
import { Filter } from 'react-bootstrap-front';

export function initFilters() {
  return {
    type: CLIENT_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
