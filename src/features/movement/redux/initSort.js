import { MOVEMENT_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: MOVEMENT_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MOVEMENT_INIT_SORT:
      return {
        ...state,
        sort: [{col:"move_from",way:"up"}],
      };

    default:
      return state;
  }
}
