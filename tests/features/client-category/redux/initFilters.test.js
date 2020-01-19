import {
  CLIENT_CATEGORY_INIT_FILTERS,
} from '../../../../src/features/client-category/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/client-category/redux/initFilters';

describe('client-category/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CLIENT_CATEGORY_INIT_FILTERS);
  });

  it('handles action type CLIENT_CATEGORY_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
