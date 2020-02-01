import { DATA_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: DATA_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_INIT_SORT:
      return {
        ...state,
        sort: [{ col: 'data_name', way: 'up' }],
      };

    default:
      return state;
  }
}
