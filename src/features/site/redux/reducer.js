// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as loadMoreReducer } from './loadMore';
import { reducer as loadOneReducer } from './loadOne';
import { reducer as createOneReducer } from './createOne';
import { reducer as updateOneReducer } from './updateOne';
import { reducer as filterReducer } from './filter';
import { reducer as delOneReducer } from './delOne';
import { reducer as clearItemsReducer } from './clearItems';
import { reducer as initFiltersReducer } from './initFilters';
import { reducer as initSortReducer } from './initSort';
import { reducer as setFiltersReducer } from './setFilters';
import { reducer as setSortReducer } from './setSort';
import { reducer as updateQuickSearchReducer } from './updateQuickSearch';
import { reducer as updateSortReducer } from './updateSort';
import { reducer as loadCausesReducer } from './loadCauses';
import { reducer as loadPhotosReducer } from './loadPhotos';
import { reducer as uploadSiteMediaReducer } from './uploadSiteMedia';
import { reducer as delSiteMediaReducer } from './delSiteMedia';
import { reducer as loadDocumentsReducer } from './loadDocuments';
import { reducer as updateSiteMediaDescReducer } from './updateSiteMediaDesc';

const reducers = [
  loadMoreReducer,
  loadOneReducer,
  createOneReducer,
  updateOneReducer,
  filterReducer,
  delOneReducer,
  clearItemsReducer,
  initFiltersReducer,
  initSortReducer,
  setFiltersReducer,
  setSortReducer,
  updateQuickSearchReducer,
  updateSortReducer,
  loadCausesReducer,
  loadPhotosReducer,
  uploadSiteMediaReducer,
  delSiteMediaReducer,
  loadDocumentsReducer,
  updateSiteMediaDescReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
