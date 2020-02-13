import {
  SICKNESS_UPDATE_SORT,
} from '../../../../src/features/sickness/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/sickness/redux/updateSort';

describe('sickness/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', SICKNESS_UPDATE_SORT);
  });

  it('handles action type SICKNESS_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SICKNESS_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
