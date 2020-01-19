import {
  CLIENT_CATEGORY_INIT_SORT,
} from '../../../../src/features/client-category/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/client-category/redux/initSort';

describe('client-category/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', CLIENT_CATEGORY_INIT_SORT);
  });

  it('handles action type CLIENT_CATEGORY_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
