import {
  DATA_CLEAR_ITEMS,
} from '../../../../src/features/data/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/data/redux/clearItems';

describe('data/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', DATA_CLEAR_ITEMS);
  });

  it('handles action type DATA_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
