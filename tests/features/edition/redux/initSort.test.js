import {
  EDITION_INIT_SORT,
} from '../../../../src/features/edition/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/edition/redux/initSort';

describe('edition/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', EDITION_INIT_SORT);
  });

  it('handles action type EDITION_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EDITION_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
