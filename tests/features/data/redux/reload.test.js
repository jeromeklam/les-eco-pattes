import {
  DATA_RELOAD,
} from '../../../../src/features/data/redux/constants';

import {
  reload,
  reducer,
} from '../../../../src/features/data/redux/reload';

describe('data/redux/reload', () => {
  it('returns correct action by reload', () => {
    expect(reload()).toHaveProperty('type', DATA_RELOAD);
  });

  it('handles action type DATA_RELOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DATA_RELOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
