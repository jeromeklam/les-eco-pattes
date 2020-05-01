import {
  CLIENT_TYPE_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: CLIENT_TYPE_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_TYPE_INIT_SORT:
      return {
        ...state,
        sort: [{col:"clit_name",way:"up"}],
      };

    default:
      return state;
  }
}
