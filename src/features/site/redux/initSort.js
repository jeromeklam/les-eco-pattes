import { SITE_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: SITE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'site_name', way: 'up' }],
      };

    default:
      return state;
  }
}
