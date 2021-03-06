import {
  CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH,
} from '../../../../src/features/cause-main-type/redux/constants';

import {
  updateQuickSearch,
  reducer,
} from '../../../../src/features/cause-main-type/redux/updateQuickSearch';

describe('cause-main-type/redux/updateQuickSearch', () => {
  it('returns correct action by updateQuickSearch', () => {
    expect(updateQuickSearch()).toHaveProperty('type', CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH);
  });

  it('handles action type CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_UPDATE_QUICK_SEARCH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
