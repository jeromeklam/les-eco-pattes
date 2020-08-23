import {
  CONTRACT_INIT_SORT,
} from '../../../../src/features/contract/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/contract/redux/initSort';

describe('contract/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', CONTRACT_INIT_SORT);
  });

  it('handles action type CONTRACT_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CONTRACT_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
