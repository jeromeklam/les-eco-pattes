import {
  CLIENT_TYPE_CLEAR_ITEMS,
} from '../../../../src/features/client-type/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/client-type/redux/clearItems';

describe('client-type/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', CLIENT_TYPE_CLEAR_ITEMS);
  });

  it('handles action type CLIENT_TYPE_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
