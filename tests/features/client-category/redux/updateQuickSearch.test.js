import {
  CLIENT_CATEGORY_UPDATE_QUICK_SEARCH,
} from '../../../../src/features/client-category/redux/constants';

import {
  updateQuickSearch,
  reducer,
} from '../../../../src/features/client-category/redux/updateQuickSearch';

describe('client-category/redux/updateQuickSearch', () => {
  it('returns correct action by updateQuickSearch', () => {
    expect(updateQuickSearch()).toHaveProperty('type', CLIENT_CATEGORY_UPDATE_QUICK_SEARCH);
  });

  it('handles action type CLIENT_CATEGORY_UPDATE_QUICK_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_UPDATE_QUICK_SEARCH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
