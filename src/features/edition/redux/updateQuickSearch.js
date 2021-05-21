import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FILTER_MODE_OR, FILTER_OPER_LIKE, FILTER_SEARCH_QUICK } from 'react-bootstrap-front';
import { EDITION_UPDATE_QUICK_SEARCH } from './constants';

export function updateQuickSearch(value) {
  return {
    type: EDITION_UPDATE_QUICK_SEARCH,
    value: value,
  };
}

export function useUpdateQuickSearch() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(updateQuickSearch(...params)), [
    dispatch,
  ]);
  return { updateQuickSearch: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_UPDATE_QUICK_SEARCH:
      let filters = state.filters;
      filters.init(FILTER_MODE_OR, FILTER_OPER_LIKE);
      filters.setSearch(FILTER_SEARCH_QUICK);
      filters.addFilter('edi_name', action.value);
      return {
        ...state,
        filters: filters,
      };

    default:
      return state;
  }
}
