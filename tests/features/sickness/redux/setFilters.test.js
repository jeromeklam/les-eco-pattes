import {
  SICKNESS_SET_FILTERS,
} from '../../../../src/features/sickness/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/sickness/redux/setFilters';

describe('sickness/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', SICKNESS_SET_FILTERS);
  });

  it('handles action type SICKNESS_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SICKNESS_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
