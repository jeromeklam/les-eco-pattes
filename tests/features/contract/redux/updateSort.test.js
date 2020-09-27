import {
  CONTRACT_UPDATE_SORT,
} from '../../../../src/features/contract/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/contract/redux/updateSort';

describe('contract/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', CONTRACT_UPDATE_SORT);
  });

  it('handles action type CONTRACT_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CONTRACT_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
