import {
  CLIENT_CATEGORY_SET_SORT,
} from '../../../../src/features/client-category/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/client-category/redux/setSort';

describe('client-category/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', CLIENT_CATEGORY_SET_SORT);
  });

  it('handles action type CLIENT_CATEGORY_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
