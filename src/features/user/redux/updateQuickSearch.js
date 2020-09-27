import { USER_UPDATE_QUICK_SEARCH } from './constants';
import { 
  FILTER_MODE_OR, 
  FILTER_OPER_LIKE, 
  FILTER_SEARCH_QUICK 
} from 'react-bootstrap-front';

export function updateQuickSearch(value) {
  return {
    type: USER_UPDATE_QUICK_SEARCH,
    value: value,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_UPDATE_QUICK_SEARCH:
      let filters = state.filters;
      filters.init(FILTER_MODE_OR, FILTER_OPER_LIKE);
      filters.setSearch(FILTER_SEARCH_QUICK);
      filters.addFilter('user_login', action.value);
      return {
        ...state,
        filters: filters,
      };

    default:
      return state;
  }
}