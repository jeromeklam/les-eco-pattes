import { CONTRACT_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: CONTRACT_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_INIT_SORT:
      return {
        ...state,
        sort: [{col:"ct_code", way:"down"}],
      };

    default:
      return state;
  }
}
