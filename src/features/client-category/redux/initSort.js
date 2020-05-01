import {
  CLIENT_CATEGORY_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: CLIENT_CATEGORY_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_CATEGORY_INIT_SORT:
      return {
        ...state,
        sort: [{col:"clic_name",way:"up"}],
      };

    default:
      return state;
  }
}
