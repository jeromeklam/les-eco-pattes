import {
  CAUSE_INIT_FILTERS,
} from '../../../../src/features/cause/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/cause/redux/initFilters';

describe('cause/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CAUSE_INIT_FILTERS);
  });

  it('handles action type CAUSE_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
