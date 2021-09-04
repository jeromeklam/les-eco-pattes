import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SET_PANEL,
} from './constants';

export function setPanel(panel = 'none') {
  return {
    type: COMMON_SET_PANEL,
    panel: panel,
  };
}

export function useSetPanel() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setPanel(...params)), [dispatch]);
  return { setPanel: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_PANEL:
      return {
        ...state,
        panel: action.panel,
        rightPanelOpened: true,
      };

    default:
      return state;
  }
}
