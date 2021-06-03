import {
  EDITION_SET_SORT,
} from '../../../../src/features/edition/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/edition/redux/setSort';

describe('edition/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', EDITION_SET_SORT);
  });

  it('handles action type EDITION_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EDITION_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
