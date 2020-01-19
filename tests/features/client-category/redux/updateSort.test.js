import {
  CLIENT_CATEGORY_UPDATE_SORT,
} from '../../../../src/features/client-category/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/client-category/redux/updateSort';

describe('client-category/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', CLIENT_CATEGORY_UPDATE_SORT);
  });

  it('handles action type CLIENT_CATEGORY_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
