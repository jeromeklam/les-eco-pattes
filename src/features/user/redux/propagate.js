import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-front';
import { USER_PROPAGATE } from './constants';

export function propagate(model) {
  return {
    type: USER_PROPAGATE,
    data: model
  };
}

export function usePropagate() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(propagate(...params)), [dispatch]);
  return { propagate: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_PROPAGATE:
      let object = jsonApiNormalizer(action.data.data);      
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeSSO_User', object, action.ignoreAdd || false);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}