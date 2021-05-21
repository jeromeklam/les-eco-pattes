import { getNewNormalizedObject } from 'jsonapi-front';
import { Filter } from 'react-bootstrap-front';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EDITION_CLEAR_ITEMS } from './constants';

export function clearItems() {
  return {
    type: EDITION_CLEAR_ITEMS,
  };
}

export function useClearItems() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(clearItems(...params)), [dispatch]);
  return { clearItems: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_CLEAR_ITEMS:
      return {
        ...state,
        items: getNewNormalizedObject('FreeFW_Edition'),
        totalItems: 0,
        page_number: 1,
        page_size: 999999,
        filters: new Filter(),
        sort: [{ col: 'edi_name', way: 'up' }],
        models: [],
        loadMorePending: false,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
