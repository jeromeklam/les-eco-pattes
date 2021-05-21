import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  EDITION_SET_FILTERS,
} from './constants';

export function setFilters(filters) {
  return {
    type: EDITION_SET_FILTERS,
    filters: filters,
  };
}

export function useSetFilters() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setFilters(...params)), [dispatch]);
  return { setFilters: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

    default:
      return state;
  }
}
