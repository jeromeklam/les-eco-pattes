import {
  EDITION_SET_FILTERS,
} from '../../../../src/features/edition/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/edition/redux/setFilters';

describe('edition/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', EDITION_SET_FILTERS);
  });

  it('handles action type EDITION_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EDITION_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
