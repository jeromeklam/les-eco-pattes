// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  DATA_RELOAD,
} from './constants';

export function reload() {
  return {
    type: DATA_RELOAD,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_RELOAD:
      return {
        ...state,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
        filters: [],
        loadMorePending: false,
        loadMoreError: null,
        loadMoreFinish: false,
        loadOnePending: false,
        loadOneError: null,
        loadOneItem: false,
        updateOnePending: false,
        updateOneError: null,
        createOnePending: false,
        createOneError: null,
      };

    default:
      return state;
  }
}
