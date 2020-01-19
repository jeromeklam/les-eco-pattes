import { CAUSE_MAIN_TYPE_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: CAUSE_MAIN_TYPE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MAIN_TYPE_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'camt_name', way: 'up' }],
      };

    default:
      return state;
  }
}
