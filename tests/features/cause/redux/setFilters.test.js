import {
  CAUSE_SET_FILTERS,
} from '../../../../src/features/cause/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/cause/redux/setFilters';

describe('cause/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', CAUSE_SET_FILTERS);
  });

  it('handles action type CAUSE_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
