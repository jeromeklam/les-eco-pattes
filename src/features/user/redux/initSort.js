import { USER_INIT_SORT } from './constants';

export function initSort() {
  return {
    type: USER_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_INIT_SORT:
      return {
        ...state,
        sort: [{col:"user_login",way:"up"}],
      };

    default:
      return state;
  }
}