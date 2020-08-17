import {
  CONTRACT_SET_FILTERS,
} from '../../../../src/features/contract/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/contract/redux/setFilters';

describe('contract/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', CONTRACT_SET_FILTERS);
  });

  it('handles action type CONTRACT_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CONTRACT_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
