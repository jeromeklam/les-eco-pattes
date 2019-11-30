// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  DATA_CLEAR_ITEMS,
} from './constants';

export function clearItems() {
  return {
    type: DATA_CLEAR_ITEMS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_CLEAR_ITEMS:
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
