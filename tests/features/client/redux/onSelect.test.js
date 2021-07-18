import {
  CLIENT_ON_SELECT,
} from '../../../../src/features/client/redux/constants';

import {
  onSelect,
  reducer,
} from '../../../../src/features/client/redux/onSelect';

describe('client/redux/onSelect', () => {
  it('returns correct action by onSelect', () => {
    expect(onSelect()).toHaveProperty('type', CLIENT_ON_SELECT);
  });

  it('handles action type CLIENT_ON_SELECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_ON_SELECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
