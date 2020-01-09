import {
  SITE_SET_FILTERS,
} from '../../../../src/features/site/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/site/redux/setFilters';

describe('site/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', SITE_SET_FILTERS);
  });

  it('handles action type SITE_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
