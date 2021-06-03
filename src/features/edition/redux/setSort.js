import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  EDITION_SET_SORT,
} from './constants';

export function setSort(sort) {
  return {
    type: EDITION_SET_SORT,
    sort: sort,
  };
}

export function useSetSort() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setSort(...params)), [dispatch]);
  return { setSort: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_SET_SORT:
      return {
        ...state,
        sort: action.sort,
      };

    default:
      return state;
  }
}
