import {Filter} from 'react-bootstrap-front';
import {
  CLIENT_CATEGORY_INIT_FILTERS,
} from './constants';

export function initFilters() {
  return {
    type: CLIENT_CATEGORY_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_CATEGORY_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
