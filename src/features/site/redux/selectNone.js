import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  SITE_SELECT_NONE,
} from './constants';

export function selectNone() {
  return {
    type: SITE_SELECT_NONE,
  };
}

export function useSelectNone() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(selectNone(...params)), [dispatch]);
  return { selectNone: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_SELECT_NONE:
      return {
        ...state,
        selected: [],
      };

    default:
      return state;
  }
}
