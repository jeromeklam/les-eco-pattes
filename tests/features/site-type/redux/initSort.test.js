import {
  SITE_TYPE_INIT_SORT,
} from '../../../../src/features/site-type/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/site-type/redux/initSort';

describe('site-type/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', SITE_TYPE_INIT_SORT);
  });

  it('handles action type SITE_TYPE_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_TYPE_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
