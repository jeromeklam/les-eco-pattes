import { Filter } from 'react-bootstrap-front';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  EDITION_INIT_FILTERS,
} from './constants';

export function initFilters() {
  return {
    type: EDITION_INIT_FILTERS,
  };
}

export function useInitFilters() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(initFilters(...params)), [dispatch]);
  return { initFilters: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
