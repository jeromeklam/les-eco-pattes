import {
  SITE_TYPE_SET_SORT,
} from '../../../../src/features/site-type/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/site-type/redux/setSort';

describe('site-type/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', SITE_TYPE_SET_SORT);
  });

  it('handles action type SITE_TYPE_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_TYPE_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
