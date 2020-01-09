import { CLIENT_SET_SORT } from './constants';

export function setSort(sort) {
  return {
    type: CLIENT_SET_SORT,
    sort: sort,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_SET_SORT:
      return {
        ...state,
        sort: action.sort,
      };

    default:
      return state;
  }
}
