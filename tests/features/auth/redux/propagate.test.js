import {
  AUTH_PROPAGATE,
} from '../../../../src/features/auth/redux/constants';

import {
  propagate,
  reducer,
} from '../../../../src/features/auth/redux/propagate';

describe('auth/redux/propagate', () => {
  it('returns correct action by propagate', () => {
    expect(propagate()).toHaveProperty('type', AUTH_PROPAGATE);
  });

  it('handles action type AUTH_PROPAGATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_PROPAGATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
