import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { COMMON_SET_FILTERS_COLS } from './constants';

export function setFiltersCols(cols = null, filters = null, sort = null, fct = null) {
  return {
    type: COMMON_SET_FILTERS_COLS,
    cols: cols,
    filters: filters,
    sort: sort,
    fct: fct,
  };
}

export function useSetFiltersCols() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setFiltersCols(...params)), [dispatch]);
  return { setFiltersCols: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_FILTERS_COLS:
      return {
        ...state,
        filtersCols: action.cols,
        filters: action.filters,
        sort: action.sort,
        onFilter: action.fct,
      };

    default:
      return state;
  }
}
