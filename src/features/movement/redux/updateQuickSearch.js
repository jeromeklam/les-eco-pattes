import { FILTER_MODE_OR, FILTER_OPER_LIKE, FILTER_SEARCH_QUICK } from 'freeassofront';
import { MOVEMENT_UPDATE_QUICK_SEARCH } from './constants';

export function updateQuickSearch(value) {
  return {
    type: MOVEMENT_UPDATE_QUICK_SEARCH,
    value: value,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_UPDATE_QUICK_SEARCH:
      let filters = state.filters;
      filters.init(FILTER_MODE_OR, FILTER_OPER_LIKE);
      filters.setSearch(FILTER_SEARCH_QUICK);
      filters.addFilter('move_tr_name', action.value);
      return {
        ...state,
        filters: filters,
      };

    default:
      return state;
  }
}
