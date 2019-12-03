import {
  CAUSE_CLEAR_ITEMS,
} from '../../../../src/features/cause/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/cause/redux/clearItems';

describe('cause/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', CAUSE_CLEAR_ITEMS);
  });

  it('handles action type CAUSE_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
