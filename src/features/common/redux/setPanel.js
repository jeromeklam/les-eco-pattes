import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SET_PANEL,
} from './constants';

export function setPanel(panel = 'none', obj = false) {
  return {
    type: COMMON_SET_PANEL,
    panel: panel,
    obj: obj,
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
        panelObj: action.obj ? action.obj : state.panelObj,
        rightPanelOpened: true,
      };

    default:
      return state;
  }
}
