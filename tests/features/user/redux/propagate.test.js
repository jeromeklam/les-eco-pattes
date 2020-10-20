import {
  USER_PROPAGATE,
} from '../../../../src/features/user/redux/constants';

import {
  propagate,
  reducer,
} from '../../../../src/features/user/redux/propagate';

describe('user/redux/propagate', () => {
  it('returns correct action by propagate', () => {
    expect(propagate()).toHaveProperty('type', USER_PROPAGATE);
  });

  it('handles action type USER_PROPAGATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: USER_PROPAGATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
