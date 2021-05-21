import {
  EDITION_INIT_FILTERS,
} from '../../../../src/features/edition/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/edition/redux/initFilters';

describe('edition/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', EDITION_INIT_FILTERS);
  });

  it('handles action type EDITION_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EDITION_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
