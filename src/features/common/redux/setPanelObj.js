import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_SET_PANEL_OBJ,
} from './constants';

export function setPanelObj(obj) {
  return {
    type: COMMON_SET_PANEL_OBJ,
    obj: obj,
  };
}

export function useSetPanelObj() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setPanelObj(...params)), [dispatch]);
  return { setPanelObj: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_PANEL_OBJ:
      return {
        ...state,
        panelObj: action.obj,
      };

    default:
      return state;
  }
}
