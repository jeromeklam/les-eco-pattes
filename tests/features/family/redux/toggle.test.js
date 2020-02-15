import {
  FAMILY_TOGGLE,
} from '../../../../src/features/family/redux/constants';

import {
  toggle,
  reducer,
} from '../../../../src/features/family/redux/toggle';

describe('family/redux/toggle', () => {
  it('returns correct action by toggle', () => {
    expect(toggle()).toHaveProperty('type', FAMILY_TOGGLE);
  });

  it('handles action type FAMILY_TOGGLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: FAMILY_TOGGLE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
