import {
  SICKNESS_SET_SORT,
} from '../../../../src/features/sickness/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/sickness/redux/setSort';

describe('sickness/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', SICKNESS_SET_SORT);
  });

  it('handles action type SICKNESS_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SICKNESS_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
