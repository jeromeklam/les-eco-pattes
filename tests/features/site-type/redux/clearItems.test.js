import {
  SITE_TYPE_CLEAR_ITEMS,
} from '../../../../src/features/site-type/redux/constants';

import {
  clearItems,
  reducer,
} from '../../../../src/features/site-type/redux/clearItems';

describe('site-type/redux/clearItems', () => {
  it('returns correct action by clearItems', () => {
    expect(clearItems()).toHaveProperty('type', SITE_TYPE_CLEAR_ITEMS);
  });

  it('handles action type SITE_TYPE_CLEAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_TYPE_CLEAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
