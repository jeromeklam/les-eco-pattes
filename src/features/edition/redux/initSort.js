import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  EDITION_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: EDITION_INIT_SORT,
  };
}

export function useInitSort() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(initSort(...params)), [dispatch]);
  return { initSort: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_INIT_SORT:
      return {
        ...state,
        sort: [{col:"edi_name", way:"up"}],
      };

    default:
      return state;
  }
}
