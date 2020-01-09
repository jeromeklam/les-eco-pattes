import {
  CAUSE_SET_SORT,
} from '../../../../src/features/cause/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/cause/redux/setSort';

describe('cause/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', CAUSE_SET_SORT);
  });

  it('handles action type CAUSE_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
