import {
  EDITION_UPDATE_SORT,
} from '../../../../src/features/edition/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/edition/redux/updateSort';

describe('edition/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', EDITION_UPDATE_SORT);
  });

  it('handles action type EDITION_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EDITION_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
