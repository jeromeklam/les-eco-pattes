import {
  CAUSE_ON_SELECT,
} from '../../../../src/features/cause/redux/constants';

import {
  onSelect,
  reducer,
} from '../../../../src/features/cause/redux/onSelect';

describe('cause/redux/onSelect', () => {
  it('returns correct action by onSelect', () => {
    expect(onSelect()).toHaveProperty('type', CAUSE_ON_SELECT);
  });

  it('handles action type CAUSE_ON_SELECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_ON_SELECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
