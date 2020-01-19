import {
  CLIENT_CATEGORY_SET_FILTERS,
} from '../../../../src/features/client-category/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/client-category/redux/setFilters';

describe('client-category/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', CLIENT_CATEGORY_SET_FILTERS);
  });

  it('handles action type CLIENT_CATEGORY_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
