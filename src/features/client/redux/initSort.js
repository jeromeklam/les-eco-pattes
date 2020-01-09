import {
  CLIENT_INIT_SORT,
} from './constants';

export function initSort() {
  return {
    type: CLIENT_INIT_SORT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_INIT_SORT:
      return {
        ...state,
        sort: [{col:"cli_lastname",way:"up"}, {col:"cli_firstname",way:"up"}],
      };

    default:
      return state;
  }
}
