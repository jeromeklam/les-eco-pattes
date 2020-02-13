import {
  SICKNESS_CLEAR_ITEMS,
} from '../../../../src/features/sickness/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/sickness/redux/clearItems';

describe('sickness/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', SICKNESS_CLEAR_ITEMS);
  });

  it('handles action type SICKNESS_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SICKNESS_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
