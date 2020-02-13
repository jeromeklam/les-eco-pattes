import {
  SICKNESS_INIT_SORT,
} from '../../../../src/features/sickness/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/sickness/redux/initSort';

describe('sickness/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', SICKNESS_INIT_SORT);
  });

  it('handles action type SICKNESS_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SICKNESS_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
