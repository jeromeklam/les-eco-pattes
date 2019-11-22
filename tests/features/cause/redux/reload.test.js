import {
  CAUSE_RELOAD,
} from '../../../../src/features/cause/redux/constants';

import {
  reload,
  reducer,
} from '../../../../src/features/cause/redux/reload';

describe('cause/redux/reload', () => {
  it('returns correct action by reload', () => {
    expect(reload()).toHaveProperty('type', CAUSE_RELOAD);
  });

  it('handles action type CAUSE_RELOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_RELOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
