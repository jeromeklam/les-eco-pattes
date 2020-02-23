import {
  MOVEMENT_CLEAR_ITEMS,
} from '../../../../src/features/movement/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/movement/redux/clearItems';

describe('movement/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', MOVEMENT_CLEAR_ITEMS);
  });

  it('handles action type MOVEMENT_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
