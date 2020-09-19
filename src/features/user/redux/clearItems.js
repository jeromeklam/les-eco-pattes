import {
  USER_CLEAR_ITEMS,
} from './constants';

export function clearItems() {
  return {
    type: USER_CLEAR_ITEMS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_CLEAR_ITEMS:
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        loadMoreFinish: false,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    default:
      return state;
  }
}
