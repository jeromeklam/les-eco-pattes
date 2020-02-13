import {
  SICKNESS_INIT_FILTERS,
} from '../../../../src/features/sickness/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/sickness/redux/initFilters';

describe('sickness/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', SICKNESS_INIT_FILTERS);
  });

  it('handles action type SICKNESS_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SICKNESS_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
