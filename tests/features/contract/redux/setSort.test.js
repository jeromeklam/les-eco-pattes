import {
  CONTRACT_SET_SORT,
} from '../../../../src/features/contract/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/contract/redux/setSort';

describe('contract/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', CONTRACT_SET_SORT);
  });

  it('handles action type CONTRACT_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CONTRACT_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
