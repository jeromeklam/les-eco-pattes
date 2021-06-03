import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { jsonApiNormalizer, normalizedObjectUpdate, normalizedObjectModeler } from 'jsonapi-front';
import {
  EDITION_PROPAGATE,
} from './constants';

export function propagate() {
  return {
    type: EDITION_PROPAGATE,
  };
}

export function usePropagate() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(propagate(...params)), [dispatch]);
  return { propagate: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case EDITION_PROPAGATE:
    let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeFW_Edition', object, action.ignoreAdd || false);
      const models = normalizedObjectModeler(news, 'FreeFW_Edition', null, { eager: true });
      return {
        ...state,
        updateOneError: null,
        items: news,
        models: models,
      };

    default:
      return state;
  }
}
