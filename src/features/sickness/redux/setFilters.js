import { SICKNESS_SET_FILTERS } from './constants';

export function setFilters(filters) {
  return {
    type: SICKNESS_SET_FILTERS,
    filters: filters,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SICKNESS_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

    default:
      return state;
  }
}
