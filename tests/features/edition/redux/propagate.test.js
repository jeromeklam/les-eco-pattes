import {
  EDITION_PROPAGATE,
} from '../../../../src/features/edition/redux/constants';

import {
  propagate,
  reducer,
} from '../../../../src/features/edition/redux/propagate';

describe('edition/redux/propagate', () => {
  it('returns correct action by propagate', () => {
    expect(propagate()).toHaveProperty('type', EDITION_PROPAGATE);
  });

  it('handles action type EDITION_PROPAGATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EDITION_PROPAGATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
