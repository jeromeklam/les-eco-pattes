import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { AUTH_PROPAGATE } from './constants';

export function propagate(model) {
  return {
    type: AUTH_PROPAGATE,
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
    case AUTH_PROPAGATE:
      let object = jsonApiNormalizer(action.data.data);
      const user = normalizedObjectModeler(object, 'FreeSSO_User', object.SORTEDELEMS[0], {eager: true});
      return {
        ...state,
        user: user,
      };

    default:
      return state;
  }
}