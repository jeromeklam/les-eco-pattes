// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as loadMoreReducer } from './loadMore';
import { reducer as loadPendingsReducer } from './loadPendings';
import { reducer as loadOneReducer } from './loadOne';
import { reducer as updateOneReducer } from './updateOne';
import { reducer as delOneReducer } from './delOne';
import { reducer as createOneReducer } from './createOne';
import { reducer as initSortReducer } from './initSort';
import { reducer as updateSortReducer } from './updateSort';
import { reducer as initFiltersReducer } from './initFilters';
import { reducer as setFiltersReducer } from './setFilters';
import { reducer as updateQuickSearchReducer } from './updateQuickSearch';
import { reducer as setSortReducer } from './setSort';
import { reducer as loadAlertsWarningReducer } from './loadAlertsWarning';
import { reducer as loadAlertsDangerReducer } from './loadAlertsDanger';

const reducers = [
  loadMoreReducer,
  loadPendingsReducer,
  loadOneReducer,
  updateOneReducer,
  delOneReducer,
  createOneReducer,
  initSortReducer,
  updateSortReducer,
  initFiltersReducer,
  setFiltersReducer,
  updateQuickSearchReducer,
  setSortReducer,
  loadAlertsWarningReducer,
  loadAlertsDangerReducer,
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
