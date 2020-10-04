import { ALERT_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: ALERT_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_INIT_SORT:
      return {
        ...state,
        sort: [{col:"alert_from", way:"up"}],
      };

    default:
      return state;
  }
}