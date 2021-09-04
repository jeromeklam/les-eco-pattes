import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_TOGGLE_RIGHT_PANEL,
} from './constants';

export function toggleRightPanel() {
  return {
    type: COMMON_TOGGLE_RIGHT_PANEL,
  };
}

export function useToggleRightPanel() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(toggleRightPanel(...params)), [dispatch]);
  return { toggleRightPanel: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_TOGGLE_RIGHT_PANEL:
      return {
        ...state,
        rightPanelOpened: !state.rightPanelOpened,
      };

    default:
      return state;
  }
}
