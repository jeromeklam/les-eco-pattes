import {
  SITE_INIT_FILTERS,
} from '../../../../src/features/site/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/site/redux/initFilters';

describe('site/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', SITE_INIT_FILTERS);
  });

  it('handles action type SITE_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
