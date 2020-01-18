import { CAUSE_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: CAUSE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'cau_name', way: 'up' }],
      };

    default:
      return state;
  }
}
