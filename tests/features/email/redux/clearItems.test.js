import {
  EMAIL_CLEAR_ITEMS,
} from '../../../../src/features/email/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/email/redux/clearItems';

describe('email/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', EMAIL_CLEAR_ITEMS);
  });

  it('handles action type EMAIL_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EMAIL_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
