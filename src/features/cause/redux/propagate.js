import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-front';
import {
  CAUSE_PROPAGATE,
} from './constants';

export function propagate(data, ignoreAdd = false) {
  return {
    type: CAUSE_PROPAGATE,
    data: data,
    ignoreAdd: ignoreAdd,
  };
}

export function usePropagate() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(propagate(...params)), [dispatch]);
  return { propagate: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_PROPAGATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_Cause', object, action.ignoreAdd || false);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
