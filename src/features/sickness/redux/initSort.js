import { SICKNESS_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: SICKNESS_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SICKNESS_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'sick_name', way: 'up' }],
      };

    default:
      return state;
  }
}
