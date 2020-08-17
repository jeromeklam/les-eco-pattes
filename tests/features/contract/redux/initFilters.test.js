import {
  CONTRACT_INIT_FILTERS,
} from '../../../../src/features/contract/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/contract/redux/initFilters';

describe('contract/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CONTRACT_INIT_FILTERS);
  });

  it('handles action type CONTRACT_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CONTRACT_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
